import { Routes } from '@angular/router';
import { ActividadComponent } from './components/actividad/actividad.component';
import { CreaeditaactividadComponent } from './components/actividad/creaeditaactividad/creaeditaactividad.component';

export const routes: Routes = [
    {
        path:'actividades',component:ActividadComponent,
        children:[{
            path:'nuevo',component:CreaeditaactividadComponent
        }]
    }
];
