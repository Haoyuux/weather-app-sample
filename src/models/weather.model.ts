export interface CurrentWeather {
  city: string;
  condition: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  sunrise: string;
  sunset: string;
  uvIndex: number;
  visibility: number;
  airQualityIndex: number;
  airQualityCategory: string;
}

export interface ForecastDay {
  day: string;
  condition: string;
  tempHigh: number;
  tempLow: number;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  condition: string;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastDay[];
  hourly: HourlyForecast[];
}
