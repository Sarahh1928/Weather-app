import { Injectable } from '@angular/core';
import { City } from '../models/city.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TemperatureUnit } from '../models/temperature-unit.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  readonly unitMap: Record<string, TemperatureUnit> = {
    'C': TemperatureUnit.Celsius,
    'F': TemperatureUnit.Fahrenheit,
  };

  private ApiEndpoint: string = 'http://localhost:4454';

  constructor(private http: HttpClient) { }

  // Using Observable because we can subscribe to get data asynchronously, handle updates, and cancel if needed.
  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.ApiEndpoint}/forecast`);
  }

  getCityById(id: number): Observable<City> {
    return this.http.get<City>(`${this.ApiEndpoint}/cityForecast/${id}`);
  }
  getWeatherIcon(temp: number, humidity: number): string {
    if (humidity > 70) return "🌧️"; // rain/cloudy
    if (humidity > 50) return "⛅"; // partly cloudy
    if (temp >= 25) return "☀️"; // hot sunny
    if (temp >= 15) return "🌤️"; // sunny
    return "🌫️"; // cold / foggy
  }
  
  getUnit(key: string): TemperatureUnit | undefined {
    return this.unitMap[key];
  }
}
