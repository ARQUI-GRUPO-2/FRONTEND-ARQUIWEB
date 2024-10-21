import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = `${base_url}/usuarios`;

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Usuario[]>(this.url);
  }
}
