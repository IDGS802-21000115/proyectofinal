import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { MateriaPrima } from '../interfaces/materiaPrima';

@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getMateriaPrimaByEstatus(estatus: number): Observable<any[]> {
        const url = `${this.apiUrl}MateriaPrima/materiaPrima/${estatus}`;
        return this.http.get<any[]>(url).pipe(
          tap(data => console.log('Datos recibidos del servidor:', data))
        );
      }
      
    editMateriaPrima(materiaPrima: MateriaPrima): Observable<string> {
      const url = `${this.apiUrl}MateriaPrima/editarMateriaPrima/${materiaPrima.idMateriaPrima}`;
      return this.http.put(url, materiaPrima, { responseType: 'text' });
    }

    createMateriaPrima(data: MateriaPrima): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.apiUrl}MateriaPrima/registroMateriaPrima`, data);
    }  

    deleteMateriaPrima(id: number, estatus: number): Observable<any> {
      return this.http.put<string>(`${this.apiUrl}MateriaPrima/estatuMateriaPrima/${id}`, { estatus }, { responseType: 'text' as 'json' });
    }
}
