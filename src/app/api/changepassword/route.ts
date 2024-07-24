// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../libs/prismadb';
// import bcrypt from 'bcrypt';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { token, password } = req.body;

//   if (!token || !password) {
//     return res.status(400).json({ message: 'Token and password are required' });
//   }

//   try {
//     const user = await prisma.user.findFirst({
//       where: {
//         resetToken: token,
//         resetTokenExpiry: {
//           gt: new Date(),
//         },
//       },
//     });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid or expired token' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         password: hashedPassword,
//         resetToken: null,
//         resetTokenExpiry: null,
//       },
//     });

//     res.status(200).json({ message: 'Password reset successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }


import prisma from '../../../libs/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token, password } = req.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await prisma.user.findFirst({
    where: {
      resetToken: hashedToken,
      resetTokenExpiry: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    return res.status(400).json({ message: 'Token is invalid or has expired' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  res.status(200).json({ message: 'Password has been changed successfully' });
};
