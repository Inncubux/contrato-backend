import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { seedInitalData } from './seeders/initial.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.use(helmet());
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      ...(process.env.CORS_ALLOWED_ORIGINS?.split(',') || [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
        'http://localhost:4173',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:5173',
      ]),
    ],
    credentials: true,
    maxAge: 86400,
    optionsSuccessStatus: 200,
  });

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3000;
  await seedInitalData();
  await app.listen(port);
  console.log(`Servidor backend corriendo en http://localhost:${port}/api`);
}
void bootstrap();
