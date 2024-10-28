import { Routes } from '@angular/router';

import { UsuarioComponent } from './components/usuario/usuario.component';
import { creareditarusuarioComponent } from './components/usuario/creareditarusuario/creareditarusuario.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { CreareditarnotificacionComponent } from './components/notificacion/creareditarnotificacion/creareditarnotificacion.component';

import { CreareditarnoticiasComponent } from './components/noticias/creareditarnoticias/creareditarnoticias.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { CentroReciclajeComponent } from './components/centro-reciclaje/centro-reciclaje.component';
import { CreareditarcentroreciclajeComponent } from './components/centro-reciclaje/creareditarcentroreciclaje/creareditarcentroreciclaje.component';

export const routes: Routes = [
    {
       path: 'usuarios', component: UsuarioComponent,
       children: [
           {
               path: 'nuevo', component: creareditarusuarioComponent
           },
           {
               path: 'ediciones/:id', component: creareditarusuarioComponent
           }
       ]
    },
    {
       path: 'notificaciones', component: NotificacionComponent,
       children: [
           {
               path: 'nuevo', component: CreareditarnotificacionComponent
           },
           {
               path: 'ediciones/:id', component: CreareditarnotificacionComponent
           }
       ]
  },
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
