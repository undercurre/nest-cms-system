import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, query, params } = req;

    console.log(`[Request] ${method} ${originalUrl}`);
    console.log('Query Params:', query);
    console.log('Route Params:', params);
    console.log('Body:', body);

    next();
  }
}
