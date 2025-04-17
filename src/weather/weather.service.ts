// src/weather/weather.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  private coordinatesApiUrl: string;
  private weatherApiUrl: string;  

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    // Retrieve URLs from the environment. The non-null assertion (!) tells TypeScript that the variables are defined.
    this.coordinatesApiUrl = this.configService.get<string>('EXTERNAL_COORDINATES_URL')!;
    this.weatherApiUrl = this.configService.get<string>('EXTERNAL_WEATHER_URL')!;
  }

  async getCoordinates(city: string): Promise<any> {
    try {
      // Fixed typo: using this.coordinatesApiUrl instead of undefined variable name
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.get(this.coordinatesApiUrl, {
          params: {
            name: city,
            count: 1,
            language: 'en',
            format: 'json',
          },
        })
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        "Error retrieving coordinates from the external API",
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getWeather(latitude: number, longitude: number): Promise<any> {
    try {
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.get(this.weatherApiUrl, {
          params: {
            latitude: latitude,
            longitude: longitude,
            hourly: 'temperature_2m',
            timezone: 'GMT',
          },
        })
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        "Error retrieving weather data from the external API",
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getWeatherByCity(city: string): Promise<any> {
    const coordinatesData = await this.getCoordinates(city);
    if (!coordinatesData.results || coordinatesData.results.length === 0) {
      throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    }

    const { latitude, longitude } = coordinatesData.results[0];
    const weatherData = await this.getWeather(latitude, longitude);
    console.log(weatherData);

    return {
      name: coordinatesData.results[0].name,  
      latitude: latitude,
      longitude: longitude,
      weather: weatherData,
    };
  }
}
