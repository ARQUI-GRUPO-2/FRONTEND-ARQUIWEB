import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TipoactividadComponent } from './components/tipoactividad/tipoactividad.component';
import { CentroReciclajeComponent } from './components/centro-reciclaje/centro-reciclaje.component';
import { NoticiasComponent } from './components/noticias/noticias.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CentroReciclajeComponent, NoticiasComponent, TipoactividadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
