import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as winston from 'winston';

import { winstonConfig } from '../logger/winston.config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston/dist/winston.constants';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
//   private logger: winston.Logger;

//   constructor() {
//     this.logger = winston.createLogger(winstonConfig);
//   }
 constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: winston.Logger,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const startTime = Date.now();
    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - startTime;
      const message = `${method} ${originalUrl} ${statusCode} ${responseTime}ms`;

      if (statusCode >= 500) {
        this.logger.error(message, { context: 'HTTP', ip });
      } else if (statusCode >= 400) {
        this.logger.warn(message, { context: 'HTTP', ip });
      } else {
        this.logger.info(message, { context: 'HTTP', ip });
      }
    });
    next();
  }
}
