import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CentroReciclaje } from '../models/CentroReciclaje';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CentroReciclajeService {
  private url = `${base_url}/centro-reciclaje`; 
  private listaCambio = new Subject<CentroReciclaje[]>();

  constructor(private http: HttpClient) { }
    list() {
      return this.http.get<CentroReciclaje[]>(this.url);
    }
    insert(c: CentroReciclaje) {
      return this.http.post(this.url, c);
    }
  
    getList() {
      return this.listaCambio.asObservable();
    }
  
    setList(listaNueva: CentroReciclaje[]) {
      this.listaCambio.next(listaNueva);
    }
  
    delete(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }
  
    listId(id: number) {
      return this.http.get<CentroReciclaje>(`${this.url}/${id}`);
    }
  
    update(centro: CentroReciclaje) {
      return this.http.put(this.url, centro);
    }
}
