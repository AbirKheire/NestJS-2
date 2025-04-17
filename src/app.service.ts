import { Injectable } from '@nestjs/common';

// Le décorateur @Injectable() indique que cette classe peut être injectée
// dans d'autres composants (contrôleurs, autres services, etc.).
@Injectable()
export class AppService {
   // La méthode getHello est une fonction publique qui ne prend aucun paramètre
  // et retourne une chaîne de caractères.
  getHello(): string {
    // Retourne hello world
    return 'Hello World!';
  }
}