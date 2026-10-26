#!/usr/bin/env bash
set -euo pipefail

# 个人网站部署脚本（一期：纯静态，Nginx 托管）
# 用法: ./scripts/deploy.sh <服务器用户> <服务器主机>
# 示例: ./scripts/deploy.sh root xzzcy.com

SERVER_USER="${1:?请提供服务器用户名}"
SERVER_HOST="${2:?请提供服务器主机}"
REMOTE_DIR="/opt/site"

echo "==> 构建静态产物"
pnpm --filter @xiaochen/web build

echo "==> 上传到 ${SERVER_USER}@${SERVER_HOST}:${REMOTE_DIR}"
ssh "${SERVER_USER}@${SERVER_HOST}" "mkdir -p ${REMOTE_DIR}"
rsync -avz --delete apps/web/out/ "${SERVER_USER}@${SERVER_HOST}:${REMOTE_DIR}/"

echo "==> 完成 ✅ 访问 https://${SERVER_HOST}"
