# 构建阶段
FROM docker.m.daocloud.io/library/node:20-alpine AS builder

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# 运行阶段
FROM docker.m.daocloud.io/library/node:20-alpine 

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install -g pnpm

ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/typeorm.config.ts ./
# COPY --from=builder /app/src/migrations ./src/migrations

# 安装生产依赖 + typeorm (用于运行 migrations)
RUN pnpm install --prod --frozen-lockfile && pnpm add typeorm ts-node

EXPOSE 3000

CMD ["node", "dist/main"]