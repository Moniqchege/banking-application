import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'banking-app-theme';
  private currentTheme: 'light' | 'dark' = 'light';

  constructor() {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.currentTheme = savedTheme;
    }
    this.applyTheme();
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem(this.THEME_KEY, this.currentTheme);
    this.applyTheme();
  }

  private applyTheme(): void {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

  getCurrentTheme(): 'light' | 'dark' {
    return this.currentTheme;
  }
}