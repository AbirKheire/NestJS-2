// utilisé poour initialiser une instance de l'appli
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Fonction asynchrone bootstrap qui démarre l'appli
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // démarrage du serveur, écoute sur port 3000
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
