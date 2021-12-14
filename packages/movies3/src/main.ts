import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.MOVIES_PORT || 4000;
  try {
    await app.listen(port);
    Logger.log(`Server started at port ${port}`);
  } catch (error) {
    Logger.error(error);
  }
}

bootstrap();
