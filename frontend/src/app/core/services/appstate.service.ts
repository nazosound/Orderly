import { Injectable, signal } from '@angular/core';
import { AppState } from '../../shared/models/appstate.model';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  appState = signal<AppState>(this.initialState());
  private initialState(): AppState {
    return {
      appName: 'Orderly',
      appVersion: '1.0.0',
      appTitle: 'Complete Orders!',
      currentLanguage: 'en',
      currentPage: 'dashboard',
      currentYear: new Date().getFullYear(),
    };
  }
}
