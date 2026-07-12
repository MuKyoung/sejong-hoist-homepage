import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // CMS(Supabase Storage)에 업로드된 시공사례 이미지 허용
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
