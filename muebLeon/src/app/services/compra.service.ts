import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { Empleado } from '../interfaces/empleado';
import { Compras } from '../interfaces/compras';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getCompraByEstatus(estatus: number): Observable<any[]> {
        const url = `${this.apiUrl}Compra/compras`;
        return this.http.get<Empleado[]>(url).pipe(
          tap(data => console.log('Datos recibidos del servidor:', data))
        );
    }
    
    createCompras(data: Compras): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.apiUrl}Compra`, data);
  }
     

}