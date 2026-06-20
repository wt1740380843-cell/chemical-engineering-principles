import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['*.dev.coze.site'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '*', pathname: '/**' }],
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  
  // 关键补丁：屏蔽掉报错的模块，让它在云端也能跑
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        module: false,
        v8: false,
      };
    }
    return config;
  },
};

export default nextConfig;
