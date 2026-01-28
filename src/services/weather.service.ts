import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { WeatherData, CurrentWeather, ForecastDay, HourlyForecast } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }

  getWeather(city: string): Observable<WeatherData> {
    if (!city || city.trim().toLowerCase() === 'error') {
      return throwError(() => new Error('Could not find weather for the specified city.')).pipe(delay(500));
    }

    const mockData = this.generateMockData(city);
    return of(mockData).pipe(delay(1000)); 
  }

  private generateMockData(city: string): WeatherData {
    const seed = city.toLowerCase().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const conditions = ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Thunderstorm', 'Snow'];
    const currentCondition = conditions[seed % conditions.length];
    const windDirections = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    
    const aqiCategories = ['Good', 'Moderate', 'Unhealthy for Sensitive Groups', 'Unhealthy', 'Very Unhealthy', 'Hazardous'];

    const current: CurrentWeather = {
      city: city.charAt(0).toUpperCase() + city.slice(1),
      condition: currentCondition,
      temperature: (seed % 35) - 5,
      feelsLike: (seed % 35) - 4,
      humidity: 40 + (seed % 50),
      windSpeed: 5 + (seed % 20),
      windDirection: windDirections[seed % windDirections.length],
      pressure: 990 + (seed % 30),
      sunrise: '06:15 AM',
      sunset: '07:45 PM',
      uvIndex: seed % 11,
      visibility: (seed % 10) + 1, // in km
      airQualityIndex: seed % 151, // 0-150
      airQualityCategory: aqiCategories[Math.floor((seed % 151) / 25)],
    };

    const forecast: ForecastDay[] = Array.from({ length: 5 }, (_, i) => {
      const daySeed = seed + i + 1;
      const dayOfWeek = new Date();
      dayOfWeek.setDate(dayOfWeek.getDate() + i + 1);
      
      return {
        day: dayOfWeek.toLocaleDateString('en-US', { weekday: 'short' }),
        condition: conditions[daySeed % conditions.length],
        tempHigh: Math.round(current.temperature + (daySeed % 5) - 2.5),
        tempLow: Math.round(current.temperature - (daySeed % 3) - 4),
      };
    });
    
    const hourly: HourlyForecast[] = Array.from({ length: 24 }, (_, i) => {
      const hourSeed = seed + i;
      const date = new Date();
      date.setHours(date.getHours() + i + 1);
      
      return {
        time: date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
        temp: Math.round(current.temperature + (Math.sin(i / 3) * 3) + (hourSeed % 3) - 1.5),
        condition: conditions[hourSeed % conditions.length],
      };
    });

    return { current, forecast, hourly };
  }
}
