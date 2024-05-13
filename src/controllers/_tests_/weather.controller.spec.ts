import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from '../weather.controller';
import { WeatherService } from '../../services/weather.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('WeatherController', () => {
  let controller: WeatherController;
  let weatherService: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [WeatherService],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
    weatherService = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should throw bad request if city or state is not provided', async () => {
      const mockQuery = {};
      await expect(controller.findAll(mockQuery)).rejects.toThrowError(
        new HttpException('please provide city and state', HttpStatus.BAD_REQUEST),
      );
    });

  });
});