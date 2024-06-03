import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
  },
  reactStrictMode: false,
  images: {
    domains: ['image.tmdb.org'],
  }
};

export default nextConfig;
