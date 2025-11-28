import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as path from 'path';

// 日志格式
const logFormat = winston.format.printf(
  ({ timestamp, level, message, context, ...meta }) => {
    const contextStr = context ? `[${context}] ` : '';
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `${timestamp} [${level}] ${contextStr}${message}${metaStr}`;
  },
);

// createLogger 的基本配置
export const winstonConfig = {
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss', // 格式化时间
    }), //添加时间戳
    // winston.format.json()
    winston.format.errors({ stack: true }),
    logFormat,
    // winston.format.colorize(),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),

        logFormat,
      ),
    }),

    // //   所有日志写入文件
    // new winston.transports.File({
    //   filename: path.join(process.cwd(), 'logs', 'app.log'),
    // }),

    // //   错误日志写入eoor
    // new winston.transports.File({
    //   filename: path.join(process.cwd(), 'logs', 'error.log'),
    //   level: 'error', // 只记录错误
    // }),

    new winston.transports.DailyRotateFile({
      dirname: path.join(process.cwd(), 'logs'),
      filename: 'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info',
    }),

    new winston.transports.DailyRotateFile({
      dirname: path.join(process.cwd(), 'logs'),
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
      level: 'error',
    }),
  ],
};
