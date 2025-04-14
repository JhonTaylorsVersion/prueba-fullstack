import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ApiKeyGuard } from './auth/api-key/api-key.guard';

async function bootstrap() {
  dotenv.config(); // carga variables .env

  const app = await NestFactory.create(AppModule);

  // Swagger setup con api-key y api-secret
  const config = new DocumentBuilder()
    .setTitle('API Usuarios')
    .setDescription('Documentación Endpoints con Swagger')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'api-key', in: 'header' }, 'api-key')
    .addApiKey(
      { type: 'apiKey', name: 'api-secret', in: 'header' },
      'api-secret',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Global Guard con API Key y Secret
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new ApiKeyGuard(reflector));

  await app.listen(3000);
}
bootstrap();
