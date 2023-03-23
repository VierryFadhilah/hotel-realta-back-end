import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const port = process.env.PORT || 8000;

  app.enableCors({
    origin: true,
  });
  app.useStaticAssets(process.env.UPLOAD_PATH, {
    prefix: '/uploads',
  });

  await app.listen(port, () => {
    console.log(`App run on port ${port}`);
  });
}
bootstrap();
