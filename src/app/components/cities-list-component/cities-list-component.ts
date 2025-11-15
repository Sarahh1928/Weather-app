import { Component, computed, Signal, signal } from '@angular/core';
import { WeatherStateService } from '../../services/weather-state.service';
import { WeatherService } from '../../services/weather-service';
import { TemperatureService } from '../../services/temperature-service';
import { WeatherIconService } from '../../services/weather-icon-service';
import { City } from '../../models/city.model';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme-service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { FiltersComponent } from '../filters-component/filters-component';

@Component({
  selector: 'app-cities-list-component',
  imports: [RouterLink,CommonModule,FiltersComponent],
  templateUrl: './cities-list-component.html',
  styleUrls: ['./cities-list-component.css']
})
export class CitiesListComponent {
  cities = signal<City[]>([]);
  loading = signal(true);
  themeMode: Signal<string> = signal('light');

  constructor(
    private weatherService: WeatherService,
    public state: WeatherStateService,
    private temperatureService: TemperatureService,
    private weatherIconService: WeatherIconService,
    public themeService: ThemeService
  ) {
    this.themeMode = this.themeService.themeMode;
    this.weatherService.getAllCities().subscribe({
      next: (data) => { this.cities.set(data); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  filteredCities = computed(() => {
    const term = this.state.searchTerm().toLowerCase();
    return this.cities().filter(c => c.city.toLowerCase().includes(term));
  });

  latestWeather(city: City) {
    const forecast = city.forecast;
    const selected = this.state.selectedDate();
    if (selected) return forecast.find(f => f.date === selected) || null;
    return forecast[0];
  }

  displayTemperature(weather: any) {
    return this.temperatureService.convert(weather.temperatureCelsius, this.state.temperatureUnit());
  }

  getIcon(temp: number, humidity: number) {
    return this.weatherIconService.getIcon(temp, humidity);
  }
}
