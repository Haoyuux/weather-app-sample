import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastDay } from '../../models/weather.model';
import { WeatherIconComponent } from '../weather-icon/weather-icon.component';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule, WeatherIconComponent],
  templateUrl: './forecast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastComponent {
  forecast = input.required<ForecastDay[]>();
}
