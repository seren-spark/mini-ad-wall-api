# Mini Ad Wall API - 快速启动指南

## 🚀 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm run start:dev
```

服务将在 `http://localhost:3000` 启动（如果 3000 端口被占用，可以创建 `.env` 文件设置 `PORT=3001`）

### 3. 测试接口

#### 方式一：使用 REST Client（推荐）

1. 安装 VS Code 插件：REST Client
2. 打开 `test-api.http` 文件
3. 点击每个请求上方的 "Send Request" 按钮

#### 方式二：使用 curl

```bash
# 创建广告
curl -X POST http://localhost:3000/ads -H "Content-Type: application/json" -d "{\"title\":\"测试广告\",\"imageUrl\":\"https://picsum.photos/400/300\",\"landingUrl\":\"https://example.com\",\"bid\":100}"

# 查询列表
curl http://localhost:3000/ads
```

#### 方式三：使用浏览器或 Postman

直接访问 `http://localhost:3000/ads` 查看广告列表

## 📋 接口清单

| 方法   | 路径             | 说明                       |
| ------ | ---------------- | -------------------------- |
| GET    | `/ads`           | 查询广告列表（按竞价排序） |
| POST   | `/ads`           | 创建广告                   |
| PATCH  | `/ads/:id`       | 编辑广告                   |
| DELETE | `/ads/:id`       | 删除广告                   |
| POST   | `/ads/:id/click` | 点击广告（次数+1）         |

## 📦 数据结构

### 广告对象（Ad）

```typescript
{
  id: string; // 自动生成的唯一ID
  title: string; // 广告标题
  imageUrl: string; // 广告图片URL
  landingUrl: string; // 落地页URL
  bid: number; // 竞价出价（用于排序）
  clicks: number; // 点击次数
  createdAt: number; // 创建时间戳
  updatedAt: number; // 更新时间戳
}
```

### 创建广告请求体（CreateAdDto）

```json
{
  "title": "广告标题",
  "imageUrl": "https://example.com/image.jpg",
  "landingUrl": "https://example.com",
  "bid": 100
}
```

## ✅ 校验规则

- **title**: 必填，非空字符串
- **imageUrl**: 必填，非空字符串
- **landingUrl**: 必填，非空字符串
- **bid**: 必填，数字类型，必须 >= 0

## 🎯 竞价排名规则

广告列表按以下规则排序：

1. **主要排序**：`bid`（竞价）降序 - 出价高的排在前面
2. **次要排序**：`updatedAt`（更新时间）降序 - 最近更新的排在前面

## 📁 数据存储

- 数据存储在 `data/ads.json` 文件中
- 首次启动时自动创建
- 支持持久化，重启服务数据不丢失

## 🔧 常见问题

### Q: 端口被占用怎么办？

A: 创建 `.env` 文件，设置 `PORT=3001` 或其他可用端口

### Q: 如何清空所有广告数据？

A: 删除 `data/ads.json` 文件，服务会自动重新创建空文件

### Q: 如何查看实时日志？

A: 使用 `pnpm run start:dev` 启动，控制台会显示所有请求日志

## 🎨 前端对接示例

```javascript
// 查询广告列表
const ads = await fetch('http://localhost:3000/ads').then((r) => r.json());

// 创建广告
const newAd = await fetch('http://localhost:3000/ads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: '新广告',
    imageUrl: 'https://example.com/image.jpg',
    landingUrl: 'https://example.com',
    bid: 150,
  }),
}).then((r) => r.json());

// 点击广告
await fetch(`http://localhost:3000/ads/${adId}/click`, {
  method: 'POST',
});

// 编辑广告
await fetch(`http://localhost:3000/ads/${adId}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ bid: 200 }),
});

// 删除广告
await fetch(`http://localhost:3000/ads/${adId}`, {
  method: 'DELETE',
});
```

## 📝 开发建议

1. 使用 `pnpm run start:dev` 启动，支持热重载
2. 使用 REST Client 插件测试接口更方便
3. 查看 `test-api.http` 了解完整的测试用例
4. 数据文件 `data/ads.json` 已加入 `.gitignore`，不会提交到版本控制
