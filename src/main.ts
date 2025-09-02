import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { ValidationPipe } from '@nestjs/common';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

let cachedServer: any;

async function bootstrapServer() {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);
    nestApp.useGlobalPipes(new ValidationPipe());
    
    const config = new DocumentBuilder()
      .setTitle('Xpert - Cats API')
      .setDescription('This is a api to get information about cats breeds. Developed as a technical test for Xpert group.')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(nestApp, config);
    SwaggerModule.setup('api', nestApp, document);

    await nestApp.init();

    cachedServer = serverlessExpress({ app: nestApp.getHttpAdapter().getInstance() });
  }
  return cachedServer;
}

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  return bootstrapServer().then(server => server(event, context));
};