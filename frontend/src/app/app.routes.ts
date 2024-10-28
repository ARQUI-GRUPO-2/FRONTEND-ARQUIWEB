import { Routes } from '@angular/router';
import { CreareditarnoticiasComponent } from './components/noticias/creareditarnoticias/creareditarnoticias.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { CentroReciclajeComponent } from './components/centro-reciclaje/centro-reciclaje.component';
import { CreareditarcentroreciclajeComponent } from './components/centro-reciclaje/creareditarcentroreciclaje/creareditarcentroreciclaje.component';

export const routes: Routes = [
    {
        path: 'noticias',component:NoticiasComponent,
        children: [
            {
                path: 'nuevo',component:CreareditarnoticiasComponent
            },
            {
                path: 'ediciones/:id',component:CreareditarnoticiasComponent
    
            }
        ]
    },
    {
        path: 'centro-reciclaje',component:CentroReciclajeComponent,
        children: [
            {
                path: 'nuevo',component:CreareditarcentroreciclajeComponent
            },
            {
                path: 'ediciones/:id',component:CreareditarcentroreciclajeComponent
    
            }
        ]
    }

];
