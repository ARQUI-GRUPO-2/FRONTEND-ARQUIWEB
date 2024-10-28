import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Actividad } from '../models/Actividad';
import { CentroReciclaje } from '../models/CentroReciclaje';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private url = `${base_url}/actividad`; 
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Actividad[]>(this.url)
    
  }
}
