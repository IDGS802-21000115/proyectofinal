import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { Empleado } from '../interfaces/empleado';
import { Compras } from '../interfaces/compras';
import { IProducto } from '../interfaces/products';
import { produccionDto } from '../interfaces/produccionDto';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getInventarioByEstatus(estatus: number): Observable<IProducto[]> {
      const url = `${this.apiUrl}Producto/productos?estatus=${estatus}`;
      return this.http.get<IProducto[]>(url).pipe(
        tap(data => console.log('Datos recibidos del servidor:', data))
      );
    }
  
    producirnventario(data: produccionDto): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}Produccion`, data);
    }

    getProductos(): Observable<IProducto[]> {
      return this.http.get<IProducto[]>(`${this.apiUrl}Producto/productos`);
    }
}