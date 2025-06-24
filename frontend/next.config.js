// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  webpack(config) {
    config.module.rules.push({
      test: /\.js$/,
      enforce: 'pre',
      use: [
        {
          loader: 'string-replace-loader',
          options: {
            search: '"use asm";',
            replace: '',
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
