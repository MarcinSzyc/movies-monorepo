import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ElasticClientService } from './elastic-client/elastic-client.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = new DocumentBuilder()
    .setTitle('Movies')
    .setDescription('Movies project')
    .setVersion('1.0')
    .addTag('Movies')
    .addBearerAuth()
    .build();

  const elasticClientService = app.get(ElasticClientService);
  elasticClientService.info();
  await elasticClientService.setupIndex();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.MOVIES_PORT || 4000;
  try {
    await app.listen(port, '0.0.0.0');
    Logger.log(`Server started at 0.0.0.0:${port}`);
  } catch (error) {
    Logger.error(error);
  }
}

bootstrap();
