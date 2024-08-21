import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './components/registro/registro.component';
import { NavbarComponent } from "./components/navbar3/navbar3.component";


@NgModule({
  declarations: [
    CarritoComponent,
    PedidoComponent,
    GraficasComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ClienteRoutingModule,
    FormsModule,
    NavbarComponent
]
})
export class ClienteModule { }
