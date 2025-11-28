/*
 * @Author: serendipity 2843306836@qq.com
 * @Date: 2025-11-23 20:58:52
 * @LastEditors: serendipity 2843306836@qq.com
 * @LastEditTime: 2025-11-28 15:41:13
 * @FilePath: \mini-ad-wall-api\src\app.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdsModule } from './ads/ads.module';
import { Ad } from './ads/entities/ad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/logger/winston.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    WinstonModule.forRoot(winstonConfig),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DB_HOST || 'localhost',
    //   port: parseInt(process.env.DB_PORT!) || 3306,
    //   username: process.env.DB_USERNAME || 'admin',
    //   password: process.env.DB_PASSWORD || '123456',
    //   database: process.env.DB_DATABASE || 'ad_wall',
    //   entities: [Ad],
    //   synchronize: process.env.NODE_ENV !== 'production', // 生产环境设为 false
    //   logging: process.env.NODE_ENV === 'development',
    //   // 添加连接选项，处理远程连接
    //   extra: {
    //     connectionLimit: 10,
    //     acquireTimeout: 60000,
    //     timeout: 60000,
    //   },
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 3306),
        username: configService.get('DB_USERNAME', 'admin'),
        password: configService.get('DB_PASSWORD', '123456'),
        database: configService.get('DB_DATABASE', 'ad_wall'),
        entities: [Ad],
        // 关键：只在开发环境开启 synchronize
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
        // 生产环境的连接配置
        extra: {
          connectionLimit: 10,
          acquireTimeout: 60000,
          timeout: 60000,
        },
      }),
      inject: [ConfigService],
    }),
    AdsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
