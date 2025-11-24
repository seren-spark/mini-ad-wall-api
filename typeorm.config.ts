
import { DataSource } from 'typeorm';
import { Ad } from './src/ads/entities/ad.entity';
import * as dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT!) || 3306,
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_DATABASE || 'ad_wall',
  entities: [Ad],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // 迁移模式下关闭
});