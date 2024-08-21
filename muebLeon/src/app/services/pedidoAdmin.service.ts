import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs'
import { environment } from '../../environments/environment.development';
import { IPedido } from '../interfaces/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
    apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  registrarPedido(pedido: IPedido): Observable<any> {
    return this.http.post(`${this.apiUrl}Pedido/pedidoRegistro`, pedido);
  }

  obtenerTodosPedidos(): Observable<IPedido[]> {
    return this.http.get<IPedido[]>(`${this.apiUrl}Pedido/pedidos`);
  }

  obtenerPedidoPorId(id: number): Observable<IPedido> {
    return this.http.get<IPedido>(`${this.apiUrl}Pedido/pedido/${id}`);
  }

  obtenerPedidosPorEmpleado(idEmpleado: number): Observable<IPedido[]> {
    return this.http.get<IPedido[]>(`${this.apiUrl}Pedido/pedido/empleado/${idEmpleado}`);
  }

  asignarEmpleadoAPedido(id: number, empleadoId: number): Observable<void> {
    // Enviar empleadoId como parámetro en la URL en lugar de en el cuerpo
    return this.http.put<void>(`${this.apiUrl}Pedido/pedido/${id}/asignar`, empleadoId, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // Asegúrate de que el Content-Type sea JSON
    });
  }

  procesarPedido(dto: { idPedido: number }): Observable<string> {
    return this.http.post(`${this.apiUrl}Pedido/procesar`, dto, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Puedes personalizar el manejo de errores aquí según tus necesidades
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Errores del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Errores del lado del servidor
      errorMessage = `Código de estado: ${error.status}\nMensaje: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}