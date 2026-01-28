import { Component, ChangeDetectionStrategy, signal, effect, inject, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './models/weather.model';
import { HourlyForecastComponent } from './components/hourly-forecast/hourly-forecast.component';
import { WeatherHighlightsComponent } from './components/weather-highlights/weather-highlights.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    CurrentWeatherComponent,
    ForecastComponent,
    HourlyForecastComponent,
    WeatherHighlightsComponent,
  ],
})
export class AppComponent {
  private weatherService = inject(WeatherService);

  weatherData: WritableSignal<WeatherData | null> = signal(null);
  isLoading: WritableSignal<boolean> = signal(true);
  error: WritableSignal<string | null> = signal(null);
  
  private city = signal('New York');

  constructor() {
    effect(() => {
      this.fetchWeather(this.city());
    }, { allowSignalWrites: true });
  }

  onSearch(city: string): void {
    this.city.set(city);
  }

  fetchWeather(city: string): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.weatherData.set(null);

    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
        this.weatherData.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.isLoading.set(false);
      }
    });
  }
}
