import { LoginService } from './services/login.service';
import { Component } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

import { RecompensaComponent } from './components/recompensa/recompensa.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { TipoactividadComponent } from './components/tipoactividad/tipoactividad.component';
import { CentroReciclajeComponent } from './components/centro-reciclaje/centro-reciclaje.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ActividadComponent } from './components/actividad/actividad.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CommonModule } from '@angular/common';

import { RolComponent } from './components/rol/rol.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    RouterLink,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    NgxMaterialTimepickerModule,
    CommonModule,
    CentroReciclajeComponent,
    NoticiasComponent,
    TipoactividadComponent,
    UsuarioComponent,
    NotificacionComponent,
    RecompensaComponent,
    ActividadComponent,
    RolComponent,
    LoginComponent,
    WelcomeComponent,
    GoogleMapsModule
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  role: string = '';
  isWelcomePage: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {
    // Verifica la ruta actual para mostrar u ocultar elementos
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isWelcomePage =
          event.url === '/' ||
          event.url === '/welcome' ||
          event.url === '/login' ||
          event.url === '/home';
      }
    });
  }

  cerrar() {
    sessionStorage.clear();
  }

  verificar(): boolean {
    this.role = this.loginService.showRole();
    return this.loginService.verificar(); // Devuelve true si está autenticado
  }

  isAdmin() {
    return this.role === 'ADMI';
  }

  isCliente() {
    return this.role === 'CLIENTE';
  }
}
