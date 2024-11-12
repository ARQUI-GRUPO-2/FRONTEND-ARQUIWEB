import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Notificaciones } from '../../../models/Notificaciones';
import { NotificacionService } from '../../../services/notificacion.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/Usuario';
import { Noticias } from '../../../models/Noticias';
import { NoticiasService } from '../../../services/noticias.service';

@Component({
  selector: 'app-listarnotificacion',
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
  templateUrl: './creareditarnotificacion.component.html',
  styleUrl: './creareditarnotificacion.component.css',
})
export class CreareditarnotificacionComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaNoticias: Noticias[] = [];
  listaUsuarios: Usuario[] = [];

  notificacion: Notificaciones = new Notificaciones();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private nS: NotificacionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ntS: NoticiasService,
    private uS: UsuarioService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hmensaje: ['', Validators.required],
      hestado: ['', Validators.required],
      hfecha: ['', Validators.required],
      hcodenoticia: ['', Validators.required],
      hcodeuser: ['',Validators.required ],
    });

    this.ntS.list().subscribe((data) => {
      this.listaNoticias = data;
    });
    
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.notificacion.idNotificaciones = this.form.value.hcodigo;
      this.notificacion.mensaje = this.form.value.hmensaje;
      this.notificacion.estado = this.form.value.hestado;
      this.notificacion.fecha = this.form.value.hfecha;
      this.notificacion.noti.idNoticias = this.form.value.hcodenoticia;
      this.notificacion.us.idUser = this.form.value.hcodeuser;

      if (this.edicion) {
        this.nS.update(this.notificacion).subscribe((data) => {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
          });
        });
      } else {
        this.nS.insert(this.notificacion).subscribe((data) => {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['notificaciones']);
  }
  init() {
    if (this.edicion) {
      this.nS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idNotificaciones),
          hmensaje: new FormControl(data.mensaje),
          hestado: new FormControl(data.estado),
          hfecha: new FormControl(data.fecha),
          hcodenoticia: new FormControl(data.noti.idNoticias),
          hcodeuser: new FormControl(data.us.idUser),
        });
      });
    }
  }
}
