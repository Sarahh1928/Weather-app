import { Component, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../services/weather-service';
import { WeatherStateService } from '../../services/weather-state.service';
import { TemperatureService } from '../../services/temperature-service';
import { WeatherIconService } from '../../services/weather-icon-service';
import { DateUtilsService } from '../../services/date-utils-service';
import { CommonModule, DatePipe } from '@angular/common';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-city-details-component',
  imports: [DatePipe,CommonModule],
  templateUrl: './city-details-component.html',
  styleUrls: ['./city-details-component.css']
})
export class CityDetailsComponent {
  city = signal<any>(null);
  weekOffset = signal(0);

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    public state: WeatherStateService,
    private tempService: TemperatureService,
    private iconService: WeatherIconService,
    private dateUtils: DateUtilsService,
    public themeService: ThemeService
  ) {
    const cityId = Number(this.route.snapshot.paramMap.get('id'));
    this.weatherService.getCityById(cityId).subscribe({
      next: (data) => {
        this.city.set(data);
        const selected = this.state.selectedDate();
        if (selected) this.weekOffset.set(this.dateUtils.getWeekOffsetFromDate(new Date(selected)));
      }
    });
  }

  weekNumber = computed(() => this.dateUtils.getWeekNumber(new Date(new Date().setDate(new Date().getDate() + this.weekOffset()))));
  weekDates = computed(() => this.dateUtils.generateWeekDates(this.weekOffset()));

  displayTemperature(forecast: any) {
    return this.tempService.convert(forecast.temperatureCelsius, this.state.temperatureUnit());
  }

  getIcon(temp: number, humidity: number) {
    return this.iconService.getIcon(temp, humidity);
  }

  forecastForDate(date: string) {
    return this.city()?.forecast.find((f: { date: string}) => f.date === date) || null;
  }

  nextWeek() { this.weekOffset.set(this.weekOffset() + 1); }
  prevWeek() { if (this.weekOffset() > 0) this.weekOffset.set(this.weekOffset() - 1); }
}
