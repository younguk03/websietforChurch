import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Cloudinary 도메인 추가
    remotePatterns: [
      {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/**`,
    },
    {
      protocol:'https',
      hostname: 'lh3.googleusercontent.com'
    },
    {
      protocol:'https',
      hostname:'phinf.pstatic.net'
    },
    {
      protocol:'http',
      hostname: 'k.kakaocdn.net'
    },
    ]
  },
  typescript:{
    ignoreBuildErrors:true,
  },
};

export default nextConfig;
