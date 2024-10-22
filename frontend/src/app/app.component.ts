import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { RecompensaComponent } from './components/recompensa/recompensa.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { TipoactividadComponent } from './components/tipoactividad/tipoactividad.component';
import { CentroReciclajeComponent } from './components/centro-reciclaje/centro-reciclaje.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ActividadComponent } from './components/actividad/actividad.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CentroReciclajeComponent, NoticiasComponent, TipoactividadComponent, UsuarioComponent, NotificacionComponent, RecompensaComponent, ActividadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
