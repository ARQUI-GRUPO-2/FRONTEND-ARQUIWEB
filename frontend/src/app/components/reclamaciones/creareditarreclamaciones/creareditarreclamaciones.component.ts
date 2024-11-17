import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Reclamaciones } from '../../../models/Reclamaciones';
import { Usuario } from '../../../models/Usuario';
import { ReclamacionesService } from '../../../services/reclamaciones.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { LoginService } from '../../../services/login.service';
import { Recompensas } from '../../../models/Recompensas';
import { RecompensaService } from '../../../services/recompensa.service';

@Component({
  selector: 'app-creareditarreclamaciones',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creareditarreclamaciones.component.html',
  styleUrl: './creareditarreclamaciones.component.css',
})
export class CreareditarreclamacionesComponent {
  form: FormGroup = new FormGroup({});
  reclamaciones: Reclamaciones = new Reclamaciones();
  listaUsuarios: Usuario[] = [];
  listaRecompensas: Recompensas[] = [];
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private rS: ReclamacionesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private recS: RecompensaService,
    private lS: LoginService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hrecompensa: ['', Validators.required],
      husuario: [this.lS.getID(), Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.recS.list().subscribe((data) => {
      this.listaRecompensas = data;
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.reclamaciones.idReclamacion = this.form.value.hcodigo;
      this.reclamaciones.recompensa.idRecompensas = this.form.value.hrecompensa;
      this.reclamaciones.usuario.idUser = this.form.value.husuario;

      if (this.edicion) {
        this.rS.update(this.reclamaciones).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.reclamaciones).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }

      this.router.navigate(['reclamaciones']);
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          hcodigo: new FormControl(data.idReclamacion),
          hrecompensa: new FormControl(data.recompensa.idRecompensas, Validators.required),
          husuario: new FormControl(data.usuario.idUser, Validators.required),
        });
      });
    }
  }
}
