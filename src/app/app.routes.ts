import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/cities-list-component/cities-list-routes/cities-list-module').then(
        m => m.CitiesListModule
      ),
  },
  {
    path: 'city/:id',
    loadChildren: () =>
      import('./components/city-details-component/city-details-routes/city-details-module').then(
        m => m.CityDetailsModule
      ),
  }
];
