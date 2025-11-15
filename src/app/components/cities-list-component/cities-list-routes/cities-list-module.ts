import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesListRoutingModule } from './cities-list-routing-module';
import { CitiesListComponent } from '../cities-list-component';


@NgModule({
  imports: [
    CommonModule,
    CitiesListRoutingModule,
    CitiesListComponent
  ]
})
export class CitiesListModule { }
