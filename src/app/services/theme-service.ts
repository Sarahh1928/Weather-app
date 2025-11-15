import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeMode = signal<ThemeMode>('light');

  constructor() {
    const stored = localStorage.getItem('darkmode');
    console.log('ThemeService constructor, stored value:', stored);
    if (stored === 'active') {
      console.log('ThemeService initialized with dark mode active');
      this.themeMode.set('dark');
    }
  }

  toggleTheme() {
    console.log('ThemeService toggling theme...');
    if (this.themeMode() === 'dark') {
      this.themeMode.set('light');
      localStorage.setItem('darkmode', 'inactive');
    } else {
      console.log('ThemeService toggling to dark mode');
      this.themeMode.set('dark');
      console.log('ThemeService themeMode is now:', this.themeMode());
      localStorage.setItem('darkmode', 'active');
    }
  }
}
