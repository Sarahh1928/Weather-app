import { Component } from '@angular/core';
import { WeatherStateService } from '../../services/weather-state.service';

@Component({
  selector: 'app-filters-component',
  imports: [],
  templateUrl: './filters-component.html',
  styleUrl: './filters-component.css',
})
export class FiltersComponent {

  constructor(private state: WeatherStateService) {}
  
  onSearch(city: string, event: Event) {
  event.preventDefault(); 
    this.state.searchTerm.set(city);
  }
}
