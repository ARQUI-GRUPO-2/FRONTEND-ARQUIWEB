import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notificacion } from '../models/Notificacion';
import { environment } from '../../environments/environment';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private url = `${base_url}/Notificaciones`;
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Notificacion[]>(this.url);
  }
}
