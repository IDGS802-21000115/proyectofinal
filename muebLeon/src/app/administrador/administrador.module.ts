import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { MateriaprimaComponent } from './components/materiaprima/materiaprima.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { PedidoaComponent } from './components/pedidoa/pedidoa.component';


@NgModule({
  declarations: [
             RegistroComponent,
             EmpleadoComponent,
             MateriaprimaComponent,
             InventarioComponent,
             PedidoaComponent
  ],
  imports: [

   
    CommonModule,
    AdministradorRoutingModule
  ]
})
export class AdministradorModule { }
