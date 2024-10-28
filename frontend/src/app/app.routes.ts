import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { creareditarusuarioComponent } from './components/usuario/creareditarusuario/creareditarusuario.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { CreareditarnotificacionComponent } from './components/notificacion/creareditarnotificacion/creareditarnotificacion.component';

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
    }
];
