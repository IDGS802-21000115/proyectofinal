import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { Empleado } from '../interfaces/empleado';
import { registroEmpleado } from '../interfaces/registerEmpleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getEmpleadosByEstatus(estatus: number): Observable<any[]> {
      const url = `${this.apiUrl}Empleado/empleado/${estatus}`;
      return this.http.get<any[]>(url).pipe(
        tap(data => console.log('Datos recibidos del servidor:', data))
      );
    }  
      
    editEmpleado(empleado: Empleado): Observable<string> {
      const url = `${this.apiUrl}Empleado/actualizarEmpleado/${empleado.idEmpleado}`;
      return this.http.put(url, empleado, { responseType: 'text' });
    }

    createEmpleado(data: registroEmpleado): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}Empleado/registroEmpleado`, data);
    }

    deleteEmpleado(id: number, estatus: number): Observable<any> {
      return this.http.put<string>(`${this.apiUrl}Empleado/estatusEmpleado/${id}`, { estatus }, { responseType: 'text' as 'json' });
    }
}
