import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置 Swagger
  const config = new DocumentBuilder()
    .setTitle('Polymarket Data API')
    .setDescription('API for managing Polymarket data collection tasks')
    .setVersion('1.0')
    .addTag('tasks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 配置 GraphQL
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
