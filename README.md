<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Mini Ad Wall API - 基于 NestJS 的广告墙后端服务，支持广告的创建、编辑、删除、列表查询和点击统计。

## Features

- ✅ 创建广告接口
- ✅ 编辑广告接口
- ✅ 删除广告接口
- ✅ 查询广告列表接口（按竞价排名）
- ✅ 点击广告次数+1接口
- ✅ CORS 跨域支持
- ✅ 基于文件的数据持久化（`data/ads.json`）

## Project setup

```bash
$ pnpm install
```

## Configuration

创建 `.env` 文件配置端口（可选）：

```bash
PORT=3001
```

如果不配置，默认使用 3000 端口。

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode (推荐开发使用)
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

服务默认运行在 `http://localhost:3000`（或 `.env` 中配置的端口）

## API Endpoints

### 1. 查询广告列表

```
GET /ads
```

返回所有广告，按竞价（bid）降序排序

**响应示例：**

```json
[
  {
    "id": "abc123",
    "title": "广告标题",
    "imageUrl": "https://example.com/image.jpg",
    "landingUrl": "https://example.com",
    "bid": 100,
    "clicks": 5,
    "createdAt": 1700000000000,
    "updatedAt": 1700000000000
  }
]
```

### 2. 创建广告

```
POST /ads
Content-Type: application/json
```

**请求体：**

```json
{
  "title": "广告标题",
  "imageUrl": "https://example.com/image.jpg",
  "landingUrl": "https://example.com",
  "bid": 100
}
```

**校验规则：**

- `title`: 必填，非空字符串
- `imageUrl`: 必填，非空字符串
- `landingUrl`: 必填，非空字符串
- `bid`: 必填，数字类型，>= 0

### 3. 编辑广告

```
PATCH /ads/:id
Content-Type: application/json
```

**请求体（所有字段可选）：**

```json
{
  "title": "新标题",
  "imageUrl": "https://example.com/new-image.jpg",
  "landingUrl": "https://example.com/new",
  "bid": 150
}
```

### 4. 删除广告

```
DELETE /ads/:id
```

**响应示例：**

```json
{
  "success": true
}
```

### 5. 点击广告（点击次数+1）

```
POST /ads/:id/click
```

**响应示例：**

```json
{
  "id": "abc123",
  "title": "广告标题",
  "clicks": 6,
  ...
}
```

## Data Storage

广告数据存储在项目根目录的 `data/ads.json` 文件中，首次运行时会自动创建。

## Quick Test

项目包含 `test-api.http` 文件，可使用 VS Code 的 REST Client 插件或其他 HTTP 客户端测试所有接口。

**使用 curl 快速测试：**

```bash
# 1. 创建广告
curl -X POST http://localhost:3001/ads \
  -H "Content-Type: application/json" \
  -d '{"title":"测试广告","imageUrl":"https://picsum.photos/400/300","landingUrl":"https://example.com","bid":100}'

# 2. 查询列表
curl http://localhost:3001/ads

# 3. 点击广告 (替换 {id} 为实际ID)
curl -X POST http://localhost:3001/ads/{id}/click

# 4. 编辑广告 (替换 {id} 为实际ID)
curl -X PATCH http://localhost:3001/ads/{id} \
  -H "Content-Type: application/json" \
  -d '{"bid":200}'

# 5. 删除广告 (替换 {id} 为实际ID)
curl -X DELETE http://localhost:3001/ads/{id}
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
