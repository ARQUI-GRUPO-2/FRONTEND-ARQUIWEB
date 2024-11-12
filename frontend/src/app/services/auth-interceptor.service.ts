import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token del sessionStorage
    const token = sessionStorage.getItem('token');

    // Si el token existe, agregarlo a la cabecera Authorization
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(cloned);
    }

    // Si no hay token, continuar con la solicitud sin agregar el encabezado Authorization
    return next.handle(req);
  }
} {

  constructor() { }
}
