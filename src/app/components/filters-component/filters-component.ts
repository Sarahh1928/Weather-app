import { Component } from '@angular/core';
import { WeatherStateService } from '../../services/weather-state.service';

@Component({
  selector: 'app-filters-component',
  templateUrl: './filters-component.html',
  styleUrl: './filters-component.css',
})
export class FiltersComponent {

  private typingTimer: any;  // timer holder

  constructor(private state: WeatherStateService) {}

  onType(city: string) {
    clearTimeout(this.typingTimer);      // reset timer
    this.typingTimer = setTimeout(() => {
      this.state.searchTerm.set(city);   // run search only after pause
    }, 400);  // 400ms pause
  }

  onSubmit(e: Event) {
    e.preventDefault();
  }
}
