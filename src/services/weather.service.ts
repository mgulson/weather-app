import { Injectable } from '@nestjs/common';
import { GetWeatherResponse } from '@/types/types';
// The weather api takes lat and lon params with api key
const openWeatherOneCallURL = 'https://api.openweathermap.org/data/3.0/onecall';

// The geo api takes q = 'city,state,country code' and api key params
const openWeatherGeoURL = 'http://api.openweathermap.org/geo/1.0/direct';

@Injectable()
export class WeatherService {
  async getWeather(
    city: string,
    state: string,
  ): Promise<GetWeatherResponse> {
    let responseGeo
    try {
      responseGeo = await this.getOpenWeatherGeo(city,state)
      responseGeo = await responseGeo.json()
    } catch (error){
      return { status: 400, message: error}
    }
    if (responseGeo.length > 0) {
      const lat = responseGeo[0].lat
      const lon = responseGeo[0].lon
      console.log(lat, lon)
      let responseWeather
      try { 
        responseWeather = await this.getOpenWeatherOneCall(lat,lon)
        responseWeather = await responseWeather.json()
      } catch (error) {
        return { status: 400, message: error}
      }
      console.log(responseWeather)
      return {status: 200, data: responseWeather};
    } else {
      return { status: 400, message: 'we could not find the city provided'}

    }

  }

  async getOpenWeatherOneCall(
    latitude: number,
    longitude: number,
  ): Promise<Response> {
    const API_KEY = process.env.OPEN_WEATHER_API_KEY;
    const lat = String(latitude);
    const lon = String(longitude);
    const weatherUrl =
      openWeatherOneCallURL + `?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}`;

    return fetch(weatherUrl);
  }


  async getOpenWeatherGeo(
    city: string,
    state: String
  ): Promise<Response> {
    const API_KEY = process.env.OPEN_WEATHER_API_KEY;
    const geoUrl =
    openWeatherGeoURL + `?q=${city},${state},1&appid=${API_KEY}`;

    return fetch(geoUrl)
  }
}
