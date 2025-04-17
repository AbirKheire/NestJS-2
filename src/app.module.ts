// on importe le décorateur "module" qui permet de rassembler les parties de l'application
import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { WeatherModule } from './weather/weather.module';

// On importe le contrôleur principal de l'application.
// Le contrôleur est responsable de la gestion des requêtes HTTP entrantes.
import { AppController } from './app.controller';

// Service principal contenant la logique métier
import { AppService } from './app.service';


@Module({
  // on importe d'autres modules
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
  }),
  WeatherModule,
],
  // on déclare les controllers apparetenant à ce module
  controllers: [AppController],
  // on déclare les services utilisés par ce ce module 
  providers: [AppService],
})
// On exporte la classe AppModule = module racine
export class AppModule {}
