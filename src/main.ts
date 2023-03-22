import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const port = process.env.PORT || 8000;

  app.enableCors({
    origin: true,
  });
  app.useStaticAssets(join(__dirname, '..', '..', 'uploads'));
  await app.listen(port, () => {
    console.log(`App run on port ${port}`);
  });
}
bootstrap();
