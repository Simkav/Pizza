import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as responseTime from 'response-time';
async function bootstrap() {
  const port = process.env.API_PORT || 3001;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Pizza Api')
    .setDescription('The pizza API description')
    .setVersion('0.0.1')
    .addTag('Pizza')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(morgan('dev'), helmet(), responseTime());

  await app.listen(port);
}
bootstrap();
