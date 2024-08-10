import 'next';

declare module 'next' {
  interface NextApiRequest {
    file: Express.Multer.File;
  }
}