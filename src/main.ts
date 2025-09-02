import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { configure as serverlessExpress } from '@vendia/serverless-express';

export async function bootstrapServer() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Xpert - Cats API')
    .setDescription(
      'This is an API to get information about cats breeds. Developed for Xpert group.'
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.init();
  return serverlessExpress({ app: app.getHttpAdapter().getInstance() });
}