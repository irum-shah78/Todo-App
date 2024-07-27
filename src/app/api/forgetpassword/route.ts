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

  const resetUrl = `${process.env.NEXTAUTH_URL}/changepassword?token=${resetToken}`;

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


// import prisma from '../../../libs/prismadb';
// import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';
// import crypto from 'crypto';

// export const POST = async (req: any) => {
//   const { email } = await req.json();

//   // Check if the email exists in the database
//   const existingUser = await prisma.user.findUnique({ where: { email } });
  
//   if (!existingUser) {
//     return NextResponse.json({ message: "Email doesn't exist." }, { status: 400 });
//   }

//   // Generate reset token and hash it
//   const resetToken = crypto.randomBytes(20).toString('hex');
//   const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
//   const resetTokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 hour

//   // Store the hashed token and expiry date
//   await prisma.user.update({
//     where: { email },
//     data: {
//       resetToken: hashedToken,
//       resetTokenExpiry,
//     },
//   });

//   // Create reset URL
//   const resetUrl = `${process.env.NEXTAUTH_URL}/changepassword?token=${resetToken}`;

//   // Configure Nodemailer transporter
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.GMAIL_USER,
//       pass: process.env.GMAIL_PASS,
//     },
//   });

//   // Mail options
//   const mailOptions = {
//     from: process.env.GMAIL_USER,
//     to: email,
//     subject: 'Password Reset Request',
//     html: `<p>You requested a password reset</p><p>Click <a href="${resetUrl}">here</a> to reset your password</p>`,
//   };

//   try {
//     // Send the email
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', info.response);
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return NextResponse.json({ message: "Failed to send email." }, { status: 500 });
//   }

//   return NextResponse.json({ message: "Password reset link sent to your email." }, { status: 200 });
// };
