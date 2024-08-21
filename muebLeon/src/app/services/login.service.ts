import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../interfaces/login';
import { map, Observable, of } from 'rxjs';

import { Cliente } from '../interfaces/cliente';
import { jwtDecode } from 'jwt-decode';
import { AuthResponseDto } from '../interfaces/AuthResponseDto';
import { RegistroDto } from '../interfaces/dtoRegistro';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = environment.apiUrl;
  private clientIdKey = 'idCliente'; // Nueva clave para almacenar el ID del cliente

  constructor(private http: HttpClient) { }

  login(data: ILogin): Observable<AuthResponseDto> {
    const response = this.http.post<AuthResponseDto>(`${this.apiUrl}Login/login`, data);
  
    response.subscribe({
      next: (responseData) => {
        // Convierte la respuesta a una cadena JSON para mostrarla
        const responseString = JSON.stringify(responseData, null, 2);
        console.log("Este es el response:", responseString);
  
        // Asume que responseData tiene una propiedad idCliente
        if (responseData && responseData.idCliente) {
          localStorage.setItem(this.clientIdKey, responseData.idCliente.toString());
        } else {
          console.error("El idCliente no está disponible en la respuesta.");
        }
      },
      error: (err) => {
        console.error("Error en la petición:", err);
      }
    });
  
    return response; // Devuelve el Observable para que otros puedan suscribirse a él si es necesario
  }
  
  

  handleLoginResponse(authResponse: AuthResponseDto): void {
    console.log('Respuesta del login:', authResponse);
  
    
    localStorage.setItem(this.clientIdKey, authResponse.idCliente.toString()); // Guardar el idCliente en el localStorage
  }

  
 
  logout(): void {
    
    localStorage.removeItem(this.clientIdKey); // Eliminar el idCliente al cerrar sesión
  }

 

  getClientId(): number | null {
    const idCliente = localStorage.getItem(this.clientIdKey);
    return idCliente ? parseInt(idCliente, 10) : null; // Convertir el idCliente a número
  }

  register(registroDto: RegistroDto): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}Cliente/registroCliente`, registroDto);
  }
  
}
