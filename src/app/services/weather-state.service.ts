import { Injectable, signal } from '@angular/core';
import { TemperatureUnit } from '../models/temperature-unit.model';

export type ThemeMode = 'light' | 'dark';
@Injectable({
  providedIn: 'root',
})
export class WeatherStateService {
  searchTerm = signal('');
  selectedDate = signal('');
  temperatureUnit = signal<TemperatureUnit>(TemperatureUnit.Celsius);
}