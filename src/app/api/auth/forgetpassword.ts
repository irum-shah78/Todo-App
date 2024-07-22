import { NextApiRequest, NextApiResponse } from 'next';
import  prisma  from '../../../libs/prismadb';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Configure the nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Generate a token
      const token = crypto.randomBytes(32).toString('hex');

      // Set the token expiration time (e.g., 1 hour)
      const expires = new Date(Date.now() + 3600000);

      // Save the token and expiration time to the user record
      await prisma.user.update({
        where: { email },
        data: {
          resetToken: token,
          resetTokenExpiry: expires,
        },
      });

      // Send the email with the reset link
      const resetLink = `${process.env.NEXT_PUBLIC_URL}/auth/resetpassword?token=${token}&email=${email}`;

      await transporter.sendMail({
        to: email,
        subject: 'Password Reset Request',
        html: `<p>You requested a password reset</p>
               <p>Click this <a href="${resetLink}">link</a> to reset your password</p>`,
      });

      res.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}


// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../libs/prismadb';
// import nodemailer from 'nodemailer';
// import crypto from 'crypto';

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS,
//   },
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { email } = req.body;

//     try {
//       const user = await prisma.user.findUnique({
//         where: { email },
//       });

//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }

//       const token = crypto.randomBytes(32).toString('hex');
//       const expires = new Date(Date.now() + 3600000);

//       await prisma.user.update({
//         where: { email },
//         data: {
//           resetToken: token,
//           resetTokenExpiry: expires,
//         },
//       });

//       const resetLink = `${process.env.NEXT_PUBLIC_URL}/auth/resetpassword?token=${token}&email=${email}`;

//       await transporter.sendMail({
//         to: email,
//         subject: 'Password Reset Request',
//         html: `<p>You requested a password reset</p>
//                <p>Click this <a href="${resetLink}">link</a> to reset your password</p>`,
//       });

//       res.status(200).json({ message: 'Password reset link sent' });
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} not allowed`);
//   }
// }
