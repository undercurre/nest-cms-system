import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumableModule } from './consumable/consumable.module';
import { LogMiddleware } from './middleware/log.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CookbookModule } from './cookbook/cookbook.module';
import { GuideModule } from './guide/guide.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { StepsModule } from './steps/steps.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.27.65.66',
      port: 3306,
      username: 'root',
      password: 'admin123',
      database: 'kitchen_cms',
      autoLoadEntities: true,
      synchronize: true, // 开发环境下使用，生产环境建议禁用
    }),
    ConsumableModule,
    CookbookModule,
    GuideModule,
    IngredientsModule,
    StepsModule,
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
