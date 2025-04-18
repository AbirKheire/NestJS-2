// Importation décorateurs et classes NestJS
import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  // Injection du service WeatherService avec le constructor
  constructor(private readonly weatherService: WeatherService) {}

  // Route : weather/by-city?city=NomDeLaVille
  @Get('by-city')
  async getWeatherByCity(@Query('city') city: string) {
    // City champ obligatoire
    if (!city) {
      throw new HttpException('City is required', HttpStatus.BAD_REQUEST);
    }

    try {
      // Appelle weatherservice pour récupérer la météo de la ville 
      const result = await this.weatherService.getWeatherByCity(city);
      return result;
    } catch (error) {
      // renvoie un mssg HTTP en cas d'erreur
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
