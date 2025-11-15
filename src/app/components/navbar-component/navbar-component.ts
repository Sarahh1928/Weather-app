import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { WeatherStateService } from '../../services/weather-state.service'
import { ThemeService } from '../../services/theme-service';
import { TemperatureService } from '../../services/temperature-service';
import { TemperatureUnit } from '../../models/temperature-unit.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar-component.html',
  styleUrls: ['./navbar-component.css']
})
export class NavbarComponent {
  @ViewChild('navbarContent') navbarContent!: ElementRef;
  currentUnit: TemperatureUnit;
  currentTheme: string;

  constructor(
    private state: WeatherStateService,
    private themeService: ThemeService,
    private temperatureService: TemperatureService
  ) {
    this.currentUnit = this.state.temperatureUnit();
    this.currentTheme = this.themeService.themeMode();
    this.applyTheme();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.currentTheme = this.themeService.themeMode();
    this.applyTheme();
    this.closeNavbar();
  }

  setUnit(unitKey: string) {
    const selected = this.temperatureService.getUnit(unitKey);
    if (selected) {
      this.currentUnit = selected;
      this.state.temperatureUnit.set(selected);
    }
    this.closeNavbar();
  }

  private applyTheme() {
    document.body.classList.toggle('darkmode', this.currentTheme === 'dark');
  }

  onDateChange(event: any) {
    this.state.selectedDate.set(event.target.value);
    this.closeNavbar();
  }

  private closeNavbar() {
    if (this.navbarContent.nativeElement.classList.contains('show')) {
      this.navbarContent.nativeElement.classList.remove('show');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.navbarContent.nativeElement.contains(event.target);
    const togglerClicked = (event.target as HTMLElement).closest('.navbar-toggler');
    if (!clickedInside && !togglerClicked) this.closeNavbar();
  }
}
