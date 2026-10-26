import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 纯静态导出，无需 Node 运行时
  output: 'export',
  // 静态托管友好：生成 /about/index.html 这类目录结构
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // 构建阶段跳过 ESLint（lint 由单独脚本 / CI 负责）
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
