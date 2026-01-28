import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourlyForecast } from '../../models/weather.model';
import { WeatherIconComponent } from '../weather-icon/weather-icon.component';

@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [CommonModule, WeatherIconComponent],
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HourlyForecastComponent {
  hourlyForecast = input.required<HourlyForecast[]>();
}
