// module.exports = {
//   images: {
//     domains: ['lh3.googleusercontent.com', 'localhost', 'example.com'],
//   },
// }


module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
};
