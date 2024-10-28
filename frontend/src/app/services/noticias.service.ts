import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Noticias } from '../models/Noticias';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private url = `${base_url}/Noticias`;

  constructor(private http: HttpClient) {  }
    list() {
      return this.http.get<Noticias[]>(this.url); 
    }
}
