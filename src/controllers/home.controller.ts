import { Controller, Get } from '@nestjs/common';
import { HomeService } from '@/services/home.service';

@Controller()
export class HomeController {
  constructor(private readonly appService: HomeService) {}

  @Get()
  getHello(): { message: string } {
    return this.appService.getHello();
  }
}
