/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',   // Enables static export for AWS S3/Amplify
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
}

export default nextConfig
