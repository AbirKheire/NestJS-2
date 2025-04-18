import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Décorateur : classe => controlleur
export class AppController {
  constructor(private readonly appService: AppService) { // Appel des fonctions dans app.service.ts

  }

  @Get() // Initialisation d'une requête GET pour la route '/'
  getHello(): string {
    return this.appService.getHello();
  }
}
