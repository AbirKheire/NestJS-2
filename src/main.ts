// utilisé poour initialiser une instance de l'appli
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Fonction asynchrone bootstrap qui démarre l'appli
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔹 Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('API Météo')
    .setDescription('Une API qui fournit la météo pour une ville donnée')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger dispo sur /api

  // démarrage du serveur, écoute sur port 3000
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
