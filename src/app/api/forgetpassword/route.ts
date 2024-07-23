// "use server";
// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../libs/prismadb';
// import nodemailer from 'nodemailer';
// import crypto from 'crypto';

// interface Config {
//   GMAIL_USER?: string;
//   GMAIL_PASSWORD?: string;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).end(`Method ${req.method} not allowed`);
//   }

//   const { email } = req.body;
//   console.log('Received email:', email); // Log the received email

//   try {
//     // Check if the user exists
//     const user = await prisma.user.findUnique({ where: { email } });
//     console.log('User found:', user); // Log the user data

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Fetch Gmail credentials from the database
//     const configData = await prisma.configuration.findMany({
//       where: { key: { in: ['GMAIL_USER', 'GMAIL_PASSWORD'] } },
//     });
//     console.log('Configuration data fetched:', configData); // Log the config data

//     // Initialize configuration object
//     const config: Config = {};

//     configData.forEach((item) => {
//       if (item.key in config) {
//         config[item.key as keyof Config] = item.value;
//       }
//     });

//     const gmailUser = config.GMAIL_USER;
//     const gmailPassword = config.GMAIL_PASSWORD;
//     console.log('Gmail User:', gmailUser); // Log the Gmail user
//     console.log('Gmail Password:', gmailPassword); // Log the Gmail password

//     if (!gmailUser || !gmailPassword) {
//       return res.status(500).json({ error: 'Gmail credentials are missing in the database' });
//     }

//     // Generate reset token and expiration date
//     const token = crypto.randomBytes(32).toString('hex');
//     const expires = new Date(Date.now() + 3600000); // 1 hour
//     console.log('Generated token:', token); // Log the token

//     // Update the user record with the reset token and expiration date
//     await prisma.user.update({
//       where: { email },
//       data: { resetToken: token, resetTokenExpiry: expires },
//     });

//     // Create the transporter for sending email
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: gmailUser,
//         pass: gmailPassword,
//       },
//     });

//     const resetLink = `${process.env.NEXTAUTH_URL}/auth/resetpassword?token=${token}&email=${email}`;
//     console.log('Reset link:', resetLink); // Log the reset link

//     // Send the reset email
//     const emailResult = await transporter.sendMail({
//       to: email,
//       subject: 'Password Reset Request',
//       html: `<p>You requested a password reset</p>
//              <p>Click this <a href="${resetLink}">link</a> to reset your password</p>`,
//     });
//     console.log('Email result:', emailResult); // Log the email result

//     res.status(200).json({ message: 'Password reset link sent' });
//   } catch (error) {
//     console.error('Error in sending reset email:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// pages/api/forgetpassword.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../libs/prismadb';
// import nodemailer from 'nodemailer';
// import crypto from 'crypto';
// import { v4 as uuidv4 } from 'uuid';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const resetToken = uuidv4();
//     const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

//     await prisma.user.update({
//       where: { email },
//       data: {
//         resetToken,
//         resetTokenExpiry,
//       },
//     });

//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS,
//       },
//     });

//     const resetUrl = `${process.env.NEXTAUTH_URL}/changepassword?token=${resetToken}`;

//     const mailOptions = {
//       from: process.env.GMAIL_USER,
//       to: email,
//       subject: 'Password Reset Request',
//       html: `<p>You requested a password reset</p><p>Click <a href="${resetUrl}">here</a> to reset your password</p>`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ message: 'Password reset link sent to your email' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../libs/prismadb';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Received request:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = uuidv4();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    console.log('Updated user with reset token:', { resetToken, resetTokenExpiry });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/changepassword?token=${resetToken}`;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset</p><p>Click <a href="${resetUrl}">here</a> to reset your password</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
