import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UnauthorizedExceptionFilter } from './auth/unauthorized-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new UnauthorizedExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('My First API')
    .setDescription(
      'It is an API written in NestJS, which is protected against authorization users and uses JWT technology as authorization.',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 4000);
}

bootstrap();
