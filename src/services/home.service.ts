import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {
  getHello(): { message: string } {
    return { message: 'Welcome to the Weather App' };
  }
}
