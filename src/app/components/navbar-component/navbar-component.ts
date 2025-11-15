import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { WeatherStateService } from '../../services/weather-state.service'
import { ThemeService } from '../../services/theme-service';
import { TemperatureService } from '../../services/temperature-service';
import { TemperatureUnit } from '../../models/temperature-unit.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar-component.html',
  styleUrls: ['./navbar-component.css']
})
export class NavbarComponent {
  @ViewChild('navbarContent') navbarContent!: ElementRef;
  currentUnit: TemperatureUnit;
  currentTheme: string;
  navbarOpen = false;

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

  closeNavbar() {
    const navbar = this.navbarContent.nativeElement;
    this.navbarOpen = !this.navbarOpen;

    if (navbar.classList.contains('show')) {
      navbar.classList.add('closing');
      navbar.classList.remove('toggler-fixed');

      setTimeout(() => {
        navbar.classList.remove('closing');
        navbar.classList.remove('show');
      }, 300);
    }
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.navbarContent.nativeElement.contains(event.target);
    const togglerClicked = (event.target as HTMLElement).closest('.navbar-toggler');
    if (!clickedInside && !togglerClicked) this.closeNavbar();
  }

  toggleNavbar() {
    console.log('Toggling navbar. Current state:', this.navbarOpen);
    this.navbarOpen = !this.navbarOpen;
    const navbar = this.navbarContent.nativeElement;
    if (this.navbarOpen) {
      navbar.classList.add('toggler-fixed');
    } 
  }

}
