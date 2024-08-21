import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IPedido } from '../interfaces/pedido';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidocService {

  private _endPoint: string = environment.apiUrl;
  private _apiURL: string = this._endPoint + 'Pedido/';

  constructor(private http: HttpClient) {}

  getList(): Observable<IPedido[]> {
    return this.http.get<IPedido[]>(`${this._apiURL}pedidos`);
  }

  registrarPedido(pedido: IPedido): Observable<any> {
    return this.http.post<any>(`${this._apiURL}pedidoRegistro`, pedido).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error ${error.status}: ${error.message}`;
    }
    console.error('Error capturado:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
