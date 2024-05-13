import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from '../home.controller';
import { HomeService } from '../../services/home.service';

describe('HomeController', () => {
  let appController: HomeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [HomeService],
    }).compile();

    appController = app.get<HomeController>(HomeController);
  });

  describe('root', () => {
    it('should return "Weather App"', () => {
      expect(appController.getHello().message).toBe('Welcome to the Weather App');
    });
  });
});
