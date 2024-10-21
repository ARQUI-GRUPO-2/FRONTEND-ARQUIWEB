import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TipoActividad } from '../models/TipoActividad';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TipoactividadService {
  private url=`${base_url}/tipodeactividades`
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<TipoActividad[]>(this.url)
  }
}
