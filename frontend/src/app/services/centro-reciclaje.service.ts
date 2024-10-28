import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CentroReciclaje } from '../models/CentroReciclaje';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CentroReciclajeService {
  private url = `${base_url}/centros-de-reciclaje`; 
  
  constructor(private http: HttpClient) { }
    list() {
      return this.http.get<CentroReciclaje[]>(this.url);
    }
}
