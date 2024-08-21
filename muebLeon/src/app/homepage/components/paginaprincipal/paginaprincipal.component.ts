import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { IProducto } from '../../../interfaces/products';

@Component({
  selector: 'app-paginaprincipal',
  templateUrl: './paginaprincipal.component.html',
  styleUrls: ['./paginaprincipal.component.css'],
})
export class PaginaprincipalComponent implements OnInit {
  productosOficina: IProducto[] = [];
  productosCasa: IProducto[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProductosOficina();
    this.loadProductosCasa();
  }

  loadProductosOficina(): void {
    this.authService.getList().subscribe(
      (data: IProducto[]) => {
        this.productosOficina = data.filter(product => product.categoria === 'oficina');
      },
      (error) => {
        console.error('Error fetching office products', error);
      }
    );
  }

  loadProductosCasa(): void {
    this.authService.getList().subscribe(
      (data: IProducto[]) => {
        this.productosCasa = data.filter(product => product.categoria === 'casa');
      },
      (error) => {
        console.error('Error fetching home products', error);
      }
    );
  }
}
