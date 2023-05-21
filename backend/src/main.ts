import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const API_PREFIX = configService.get<string>('API_PREFIX') ?? '';
  app.setGlobalPrefix(API_PREFIX);

  if (!port) {
    throw new Error('Cannot find PORT in config');
  }

  // Document
  const config = new DocumentBuilder()
    .setTitle('Application')
    .setDescription('Apis document for client')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'Authentication',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const hostname = configService.get<string>('HOST');
  const docsBaseUrl = configService.get<string>('DOCS_BASE_URL') as string;
  SwaggerModule.setup(docsBaseUrl, app, document);

  await app.listen(port).then(() => {
    console.log(`🚀 Server is ready at ${port}`);
    console.log(
      `📖 Docs available on http://${hostname}:${port}${docsBaseUrl}`,
    );
  });
}
bootstrap();
