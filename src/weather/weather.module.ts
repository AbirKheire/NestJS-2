import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';  
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    // eslint-disable-next-line prettier/prettier
    imports: [
    // modules importés (http et config)
        HttpModule,
        ConfigModule,
    ],
  controllers: [WeatherController],
  // services
  providers: [WeatherService],
})
export class WeatherModule {}