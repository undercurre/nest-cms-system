import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 启用 CORS
  app.enableCors({
    origin: '*', // 允许所有源（可以替换为具体的域名或 URL）
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的 HTTP 方法
    allowedHeaders: 'Content-Type, Accept', // 允许的请求头
    credentials: true, // 是否允许携带凭据
  });

  const config = new DocumentBuilder()
    .setTitle('MOVA-CMS API')
    .setDescription('API documentation for the CMS system')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.setGlobalPrefix('web/cms/mova-cms');

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
