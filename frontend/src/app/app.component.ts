import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsuarioComponent, NotificacionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
