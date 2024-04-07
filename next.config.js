/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'res.cloudinary.com'
    ]
  }
}

module.exports = nextConfig;
/*  @type {import('next').NextConfig} 
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'res.cloudinary.com', 
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com'
    ]
  }
}

module.exports = nextConfig*/