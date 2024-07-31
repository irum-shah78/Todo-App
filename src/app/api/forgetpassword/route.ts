import prisma from '../../../libs/prismadb';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export const POST = async (req: any) => {
  const { email } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  
  if (!existingUser) {
    return NextResponse.json({ message: "Email doesn't exist." }, { status: 400 });
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  const passwordResetExpires = new Date(Date.now() + 3600000);

  await prisma.user.update({
    where: { email },
    data: {
      resetToken: passwordResetToken,
      resetTokenExpiry: passwordResetExpires,
    },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL}/resetpassword?token=${resetToken}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    html: `<p>You requested a password reset</p><p>Click <a href="${resetUrl}">here</a> to reset your password</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: "Failed to send email." }, { status: 500 });
  }

  return NextResponse.json({ message: "Password reset link sent to your email." }, { status: 200 });
};