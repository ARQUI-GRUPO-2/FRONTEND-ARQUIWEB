import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginService } from '../../../services/login.service';

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
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/rol.service';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    MatCheckboxModule,
    MatFormFieldModule],
  templateUrl: './creareditarusuario.component.html',
  styleUrl: './creareditarusuario.component.css',
})
export class creareditarusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaRoles: Rol[]=[];
  usuario: Usuario = new Usuario();
  id: number = 0;
  edicion: boolean = false;

  listaGenero: { value: string; viewValue: string }[] = [
    { value: 'Masculino', viewValue: 'Masculino' },
    { value: 'Femenino', viewValue: 'Femenino' },
  ];
  listaEnabled: { value: string; viewValue: string }[] = [
    { value: 'true', viewValue: 'true' },
    { value: 'false', viewValue: 'false' }, //VERIFICARLUEGO
  ];

  role:string='';

  constructor(
    private uS: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route:ActivatedRoute,
    private rS: RolService,
    private lS: LoginService
  ) {}
  ngOnInit(): void {
    this.role = this.lS.showRole();

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
      //henabled: [false, Validators.required],
      hroles: ['', Validators.required]
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
      this.usuario.rol = this.form.value.hroles;
      //this.usuario.rol.idRol = this.form.value.hroles;

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
        //this.form = new FormGroup({
        this.form = this.formBuilder.group({
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
          hroles: new FormControl(data.rol.idRol)
        });
      });
    }
  }
}
