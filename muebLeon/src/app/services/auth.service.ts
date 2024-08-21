import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../interfaces/login';
import { IProducto } from '../interfaces/products';
import { map, Observable } from 'rxjs';

import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _endPoint: string = environment.apiUrl;
  private _apiURL: string = this._endPoint + 'Producto/';

  constructor(private http: HttpClient) {}
  getList(): Observable<IProducto[]> {
    return this.http.get<IProducto[]>(`${this._apiURL}productos`);
  }
}

