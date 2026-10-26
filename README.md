# 小c · 个人品牌网站

个人 IP 展示 + 多平台引流。当前为**第一阶段：欢迎页（纯静态）**。

## 技术栈

- Next.js 15（App Router，`output: 'export'` 纯静态）
- TypeScript 5 · Tailwind CSS 4 · Framer Motion 12
- pnpm workspace + Turborepo

## 目录

```
xiaochen-site/
├── apps/web/          # 前端（一期只建这个）
├── packages/          # 共享包（二期）
└── scripts/deploy.sh  # 部署脚本
```

## 本地开发

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## 构建（静态导出）

```bash
pnpm build        # 产物在 apps/web/out/
```

## 部署

```bash
./scripts/deploy.sh <服务器用户> <服务器主机>
```

详见《个人网站-第一阶段方案.md》。
