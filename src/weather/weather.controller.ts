import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('by-city')
  async getWeatherByCity(@Query('city') city: string) {
    if (!city) {
      throw new HttpException('City is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.weatherService.getWeatherByCity(city);
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
