import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { PaginaprincipalComponent } from './components/paginaprincipal/paginaprincipal.component';


@NgModule({
  declarations: [
    PaginaprincipalComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule
  ],
  exports:[
    PaginaprincipalComponent
  ]
})
export class HomepageModule { }
