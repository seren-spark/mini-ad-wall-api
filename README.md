# Mini Ad Wall API

基于 NestJS + TypeORM 的广告墙后端服务，提供广告的增删改查、点击统计以及表单配置接口。

## 技术栈

- **Framework**：NestJS
- **Database ORM**：TypeORM
- **Database**：MySQL
- **Validation**：class-validator / class-transformer
- **Logging**：winston / nest-winston
- **API 文档**：@nestjs/swagger + swagger-ui-express

---

## 快速启动

### 1. 安装依赖

```bash
pnpm install
# 或
npm install
# 或
yarn install
```

### 2. 配置环境变量

项目根目录已有示例文件：

- [.env.development](cci:7://file:///e:/Mini-Ad-Wall/mini-ad-wall-api/.env.development:0:0-0:0)
- [.env.production](cci:7://file:///e:/Mini-Ad-Wall/mini-ad-wall-api/.env.production:0:0-0:0)

你可以复制一份为 [.env](cci:7://file:///e:/Mini-Ad-Wall/mini-ad-wall-api/.env:0:0-0:0)，并根据实际情况修改数据库等配置，例如：

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=mini_ad_wall
```

### 3. 数据库迁移

先编译，再执行迁移（使用 TypeORM）：

```bash
pnpm build
pnpm migration:run
```

或使用 npm：

```bash
npm run build
npm run migration:run
```

### 4. 启动服务

开发环境热更新：

```bash
pnpm start:dev
# 或
npm run start:dev
```

生产编译 + 启动：

```bash
pnpm build
pnpm start:prod
# 或
npm run build
npm run start:prod
```

默认监听端口：`http://localhost:3000`（可通过 `PORT` 环境变量修改）

---

## Swagger API 文档

在应用中通过 `SwaggerModule` 挂载了文档：

```ts
SwaggerModule.setup('swagger', app, document);
```

因此服务启动后，可以通过以下地址访问 Swagger UI：

- 本地默认地址：
  **http://localhost:3000/swagger**

如果你在 [.env](cci:7://file:///e:/Mini-Ad-Wall/mini-ad-wall-api/.env:0:0-0:0) 中修改了 `PORT`，请把上述链接中的端口改成对应值。

---

## 核心功能说明

### 广告管理（Ads）

控制器：`src/ads/ads.controller.ts`

主要接口示例（路径以 `/ads` 开头）：

- **GET** `/ads`查询广告列表（按竞价 `bid` 降序）
- **POST** `/ads/create`创建广告（请求体为 `CreateAdDto`）
- **PATCH** `/ads/:id`更新指定 ID 的广告（请求体为 `UpdateAdDto`）
- **DELETE** `/ads/delete/:id`删除广告
- **POST** `/ads/click/:id`记录广告点击
- **GET** `/ads/form-config`
  获取创建/编辑广告的表单配置（用于前端动态渲染表单）

所有接口均通过 Swagger 注解（`@ApiTags` / `@ApiOperation` / `@ApiResponse` 等）自动出现在 Swagger 文档中。

---

## 全局能力

在 `src/main.ts` 中配置了：

- **全局异常过滤器**：`AllExceptionFilter`
- **全局响应拦截器**：`TransformInterceptors`
- **全局参数校验管道**：`ValidationPipe`（自动类型转换、白名单校验）

---

## 脚本命令一览

在 [package.json](cci:7://file:///e:/Mini-Ad-Wall/mini-ad-wall-api/package.json:0:0-0:0) 中可以使用的常用脚本：

```bash
pnpm start        # 普通启动
pnpm start:dev    # 开发模式热更新
pnpm start:prod   # dist 编译后启动
pnpm build        # 编译 TypeScript
pnpm test         # 单元测试
pnpm test:e2e     # e2e 测试
pnpm lint         # 代码检查与修复
pnpm migration:generate # 生成数据库迁移
pnpm migration:run      # 执行迁移
pnpm migration:revert   # 回滚迁移
```

---


</p>
