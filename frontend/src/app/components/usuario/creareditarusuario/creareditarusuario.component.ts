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
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-creareditarusuario',
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
  templateUrl: './creareditarusuario.component.html',
  styleUrl: './creareditarusuario.component.css',
})
export class creareditarusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();

  id: number = 0;
  edicion: boolean = false;

  listaGenero: { value: string; viewValue: string }[] = [
    { value: 'Masculino', viewValue: 'Masculino' },
    { value: 'Femenino', viewValue: 'Femenino' },
  ];

  constructor(
    private uS: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route:ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    });
    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombres: ['', Validators.required],
      hapellidos: ['', Validators.required],
      husername: ['', Validators.required],
      hdni: ['', Validators.required],
      hedad: ['', Validators.required],
      hgenero: ['', Validators.required],
      hdistrito: ['', Validators.required],
      htelefono: ['', Validators.required],
      hcorreo: ['', Validators.required],
      hpassword: ['', Validators.required],
      henabled: ['', Validators.required],
      hroles: [''],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.usuario.idUser = this.form.value.hcodigo;
      this.usuario.nombres = this.form.value.hnombres;
      this.usuario.apellidos = this.form.value.hapellidos;
      this.usuario.username = this.form.value.husername;
      this.usuario.dni = this.form.value.hdni;
      this.usuario.edad = this.form.value.hedad;
      this.usuario.genero = this.form.value.hgenero;
      this.usuario.distrito = this.form.value.hdistrito;
      this.usuario.telefono = this.form.value.htelefono;
      this.usuario.correo = this.form.value.hcorreo;
      this.usuario.password = this.form.value.hpassword;
      this.usuario.enabled = this.form.value.henabled;
      this.usuario.roles = this.form.value.hroles;
      if (this.edicion) {
        this.uS.update(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['usuarios']);
  }
  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idUser),
          hnombres: new FormControl(data.nombres),
          hapellidos: new FormControl(data.apellidos),
          husername: new FormControl(data.username),
          hdni: new FormControl(data.dni),
          hedad: new FormControl(data.edad),
          hgenero: new FormControl(data.genero),
          hdistrito: new FormControl(data.distrito),
          htelefono: new FormControl(data.telefono),
          hcorreo: new FormControl(data.correo),
          hpassword: new FormControl(data.password),
          henabled: new FormControl(data.enabled),
          hroles: new FormControl(data.roles)
        });
      });
    }
  }
}
