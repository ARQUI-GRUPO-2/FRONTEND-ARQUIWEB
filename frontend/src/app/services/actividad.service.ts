import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Actividad } from '../models/Actividad';
import { Observable, Subject } from 'rxjs';
import { ActividadesPorCentroDTO } from '../models/ActividadesPorCentroDTO';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private url = `${base_url}/actividad`; 
  private listaCambio= new Subject<Actividad[]>()
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Actividad[]>(this.url)
  }
  insert(ac:Actividad){
    return this.http.post(this.url, ac)
  }
  setList(ListaNueva:Actividad[]){
    this.listaCambio.next(ListaNueva)
  }
  getList()
  {
    return this.listaCambio.asObservable();
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id:number){
    return this.http.get<Actividad>(`${this.url}/${id}`);
  }

  update(act: Actividad){
    return this.http.put(this.url, act)
  }

  getActividadesporCentro(): Observable<ActividadesPorCentroDTO[]>{
    return this.http.get<ActividadesPorCentroDTO[]>(`${this.url}/ActividadesPorCentro`);
  }
}
