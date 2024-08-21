import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Proveedor } from '../interfaces/proveedor';
import { AuthResponse } from '../interfaces/auth-response';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getProveedoresByEstatus(estatus: number): Observable<any[]> {
        const url = `${this.apiUrl}Proveedor/proveedor/${estatus}`;
        return this.http.get<Empleado[]>(url).pipe(
          tap(data => console.log('Datos recibidos del servidor:', data))
        );
    }
      
      
    // Método para actualizar un proveedor
    // Modifica el método editProveedor para que devuelva Observable<string>
    editProveedor(proveedor: Proveedor): Observable<string> {
      const url = `${this.apiUrl}Proveedor/editarProveedor/${proveedor.idProveedor}`;
      return this.http.put(url, proveedor, { responseType: 'text' });
    }


    // Método para crear un nuevo proveedor
    createProveedor(data: Proveedor): Observable<AuthResponse> {
        // Verifica que la URL coincida con el endpoint de registro en tu API
        return this.http.post<AuthResponse>(`${this.apiUrl}Proveedor/registroProveedor`, data);
    }

    // Método para eliminar un proveedor
    deleteProveedor(id: number, estatus: number): Observable<any> {
      // El método HTTP es PUT y el cuerpo de la solicitud contiene el nuevo estatus
      return this.http.put<string>(`${this.apiUrl}Proveedor/estatusProveedor/${id}`, { estatus }, { responseType: 'text' as 'json' });
    }
}
