import { Component, OnInit } from '@angular/core';
import { NavigationEnd, RouterModule, RouterOutlet } from '@angular/router';

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
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CentroReciclajeComponent, NoticiasComponent, TipoactividadComponent, UsuarioComponent, NotificacionComponent, RecompensaComponent, ActividadComponent, 
    MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule, RouterModule, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isHomePage: boolean = true; 

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/'; 
    });
  }
}