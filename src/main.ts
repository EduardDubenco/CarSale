import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Car Sale Platform API')
    .setDescription('API pentru platforma de vânzare mașini second-hand')
    .setVersion('1.0')
    .addTag('sellers', 'Vânzători')
    .addTag('clients', 'Clienți')
    .addTag('car-brands', 'Mărci Auto')
    .addTag('car-models', 'Modele Auto')
    .addTag('cars', 'Mașini')
    .addTag('orders', 'Comenzi')
    .addTag('car-attributes', 'Atribute Mașini')
    .addTag('detailing', 'Detailing')
    .addTag('accessories', 'Accesorii Auto')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
