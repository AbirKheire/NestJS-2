// src/weather/weather.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // Rqt HTTP externes
import { ConfigService } from '@nestjs/config'; // accès aux var d'env
import { AxiosResponse } from 'axios'; // Type de réponse HTTP
import { lastValueFrom } from 'rxjs';

// @Injectable : rend le service injectable dans d'autres classes
@Injectable() 
export class WeatherService {
  private coordinatesApiUrl: string;
  private weatherApiUrl: string;  

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    // Récupère les URL des APIs depuis .env
    this.coordinatesApiUrl = this.configService.get<string>('EXTERNAL_COORDINATES_URL')!;
    this.weatherApiUrl = this.configService.get<string>('EXTERNAL_WEATHER_URL')!;
  }
  // récupère les coordonnées d'une ville via API externe
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
      // gesion des erreurs de l'API de géoloc
    } catch (error) {
      throw new HttpException(
        "Error retrieving coordinates from the external API",
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

    // Récupère les données météo (latitude longitude)
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
      // gère les erreurs de l'API meteo
      throw new HttpException(
        "Error retrieving weather data from the external API",
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  // Méthode qui récupère la météo à partir d'une ville
  async getWeatherByCity(city: string): Promise<any> {
    const coordinatesData = await this.getCoordinates(city);
    // Vérifie que la ville existe 
    if (!coordinatesData.results || coordinatesData.results.length === 0) {
      throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    }
    const { latitude, longitude } = coordinatesData.results[0];
    const weatherData = await this.getWeather(latitude, longitude);
    console.log(weatherData);

    // Retourne objet combiné ville + météo
    return {
      name: coordinatesData.results[0].name,  
      latitude: latitude,
      longitude: longitude,
      weather: weatherData,
    };
  }
}
