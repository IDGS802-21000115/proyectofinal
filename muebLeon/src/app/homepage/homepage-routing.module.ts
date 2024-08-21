import { NgModule } from '@angular/core';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { PaginaprincipalComponent } from './components/paginaprincipal/paginaprincipal.component';

const routes: Routes = [
  {path:'',component:PaginaprincipalComponent},
  {path:'',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes),RouterLink],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
