import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

async function bootstrap() {
  // const appModule = await NestFactory.create(AppModule, { cors: true });

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'storage'), {
    index: false,
    prefix: '/storage',
  });

  console.log('process.env.test', process.env.test);

  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  await app.listen(3000);
}
bootstrap();
