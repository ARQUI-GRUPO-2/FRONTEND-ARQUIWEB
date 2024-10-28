import { Routes } from '@angular/router';
import { RecompensaComponent } from './components/recompensa/recompensa.component';
import { CreareditarrecompensaComponent } from './components/recompensa/creareditarrecompensa/creareditarrecompensa.component';

export const routes: Routes = [
    {
        path:'recompensas',component:RecompensaComponent,
        children:[
            {
                path:'nuevo',component:CreareditarrecompensaComponent
            },
            {
              path:'ediciones/:id',component:CreareditarrecompensaComponent
            }
        ]
    }
];
