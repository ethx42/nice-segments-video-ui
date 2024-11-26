/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // eslint-disable-next-line no-undef
  basePath: process.env.NODE_ENV === 'production' ? '/nice-segments-video-ui' : '',
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
