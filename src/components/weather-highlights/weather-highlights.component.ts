import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeather } from '../../models/weather.model';

@Component({
  selector: 'app-weather-highlights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-highlights.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherHighlightsComponent {
  currentWeather = input.required<CurrentWeather>();

  getUvIndexCategory(uvIndex: number): string {
    if (uvIndex <= 2) return 'Low';
    if (uvIndex <= 5) return 'Moderate';
    if (uvIndex <= 7) return 'High';
    if (uvIndex <= 10) return 'Very High';
    return 'Extreme';
  }

  getAirQualityColor(aqi: number): string {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    if (aqi <= 300) return 'bg-purple-500';
    return 'bg-maroon-500';
  }
}
