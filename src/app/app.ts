import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar-component/navbar-component';
import { ThemeMode } from './services/weather-state.service';
import { ThemeService } from './services/theme-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('WeatherApp');
  themeMode: ThemeMode = 'light';
  lightColor = '#87CEEB';
  darkColor = '#2C3E50';
  
  constructor(public state: ThemeService) {}
  onThemeChanged(theme: ThemeMode) {
    this.state.themeMode.set(theme);
    this.themeMode = theme;
  }
  shootingStars = Array.from({ length: 5 }, () => ({
    top: Math.random() * 40,       // top % position
    left: Math.random() * 100,     // left % position
    delay: Math.random() * 5        // animation delay in seconds
  }));
}
