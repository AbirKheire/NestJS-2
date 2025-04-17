import { Test, TestingModule } from '@nestjs/testing'; // Créer un module de test
import { AppController } from './app.controller'; // Import du controller à tester
import { AppService } from './app.service'; // Import du service utilisé par le controller

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController); // Création d'une instance du controller
  });

  describe('root', () => { // label du test
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
