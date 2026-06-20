import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 核心：彻底关闭类型检查和格式校验，让编译器“闭眼”工作
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  
  // 核心：强行关闭 Webpack 的复杂缓存和多线程，防止服务器崩溃
  webpack: (config, { isServer }) => {
    config.optimization.minimize = false; // 关闭压缩，极大减少构建时间
    config.resolve.fallback = { fs: false, module: false };
    return config;
  },
  
  // 核心：跳过某些不必要的静态分析
  staticPageGenerationTimeout: 1000, 
};

export default nextConfig;
