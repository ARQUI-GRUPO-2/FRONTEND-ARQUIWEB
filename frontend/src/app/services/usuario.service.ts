import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { CantidadNotiUsuarioDTO } from '../models/CantidadNotiUsuarioDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = `${base_url}/usuarios`;
  private listaCambio = new Subject<Usuario[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Usuario[]>(this.url);
  }

  insert(u: Usuario) {
    return this.http.post(this.url, u);
  }

  
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id:number){
    return this.http.get<Usuario>(`${this.url}/${id}`)
  }
  
  update(usu: Usuario){
    return this.http.put(this.url, usu);
  }

  getCantidad(): Observable<CantidadNotiUsuarioDTO[]> {
    return this.http.get<CantidadNotiUsuarioDTO[]>(`${this.url}/cantidad`);
    }
}
