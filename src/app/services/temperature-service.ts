// services/temperature.service.ts
import { Injectable } from '@angular/core';
import { TemperatureUnit } from '../models/temperature-unit.model';

@Injectable({ providedIn: 'root' })
export class TemperatureService {
  private unitMap: Record<string, TemperatureUnit> = {
    'C': TemperatureUnit.Celsius,
    'F': TemperatureUnit.Fahrenheit,
  };

  convert(valueCelsius: number, unit: TemperatureUnit): number {
    return unit === TemperatureUnit.Celsius
      ? valueCelsius
      : Math.round(valueCelsius * 9/5 + 32);
  }

  getUnit(key: string): TemperatureUnit | undefined {
    return this.unitMap[key];
  }
}
