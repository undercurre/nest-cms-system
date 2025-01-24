import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ConsumableModule } from './consumable/consumable.module';
import { LogMiddleware } from './middleware/log.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mova_cms_mysql',
      // host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'mova_cms',
      autoLoadEntities: true,
      synchronize: true, // 开发环境下使用，生产环境建议禁用
    }),
    UsersModule,
    ProductsModule,
    ConsumableModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR, // 声明为全局拦截器
      useClass: TransformInterceptor, // 使用 ResponseInterceptor
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // 对所有路由生效
  }
}
  