import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RolService } from '../../services/rol.service';
import { Usuario } from '../../models/Usuario';
import { Rol } from '../../models/Rol';

@Component({
  selector: 'app-home',
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
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaRoles: Rol[] = [];
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
    private route: ActivatedRoute,
    private rS: RolService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
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
      hroles: ['', Validators.required],
    });

    this.rS.list().subscribe((data) => {
      this.listaRoles = data;
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
      this.usuario.rol.idRol = this.form.value.hroles;
    }
    this.router.navigate(['noticias']);
  }
}
