// services/weather-icon.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WeatherIconService {
  getIcon(temp?: number, humidity?: number): string {
    if (temp === undefined || humidity === undefined) return '❓';
    if (temp >= 25) return '☀️';
    if (humidity > 70) return '🌧️';
    if (temp < 15) return '❄️';
    return '⛅';
  }
}
