import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { WeatherService } from '@/services/weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async findAll(@Query() query: any){
    if(!query.city || !query.state){
      throw new HttpException('please provide city and state', HttpStatus.BAD_REQUEST)
    }
    const response = await this.weatherService.getWeather(query.city, query.state);

    console.log(response)
    if(response.status == 400) {
      throw new HttpException(response.message, HttpStatus.BAD_REQUEST)
    } else {
      return response.data
    }
  }
}
