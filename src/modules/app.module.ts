import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { HomeController } from '../controllers/home.controller';
import { HomeService } from '../services/home.service';
import { WeatherController } from '@/controllers/Weather.controller';
import { WeatherService } from '@/services/weather.service';
import { CorsMiddleware } from '@/middleware/cors.middleware';

@Module({
  imports: [],
  controllers: [HomeController, WeatherController],
  providers: [HomeService, WeatherService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
