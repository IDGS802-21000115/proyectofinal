import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';


import { NavbarComponent } from './cliente/components/navbar/navbar.component';
import { HomepageModule } from "./homepage/homepage.module";
import { PaginaprincipalComponent } from './homepage/components/paginaprincipal/paginaprincipal.component';
import { PedidoComponent } from './cliente/components/pedido/pedido.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule, NgFor, NgIf, RouterLink, NavbarComponent, HomepageModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AppMuebleria';
}
