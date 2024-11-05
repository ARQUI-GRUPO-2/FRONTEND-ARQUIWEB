import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CentroReciclajeService } from '../../../services/centro-reciclaje.service';
import { CentroReciclaje } from './../../../models/CentroReciclaje';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@Component({
  selector: 'app-creareditarcentroreciclaje',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, ReactiveFormsModule, CommonModule, NgxMaterialTimepickerModule], 
  templateUrl: './creareditarcentroreciclaje.component.html',
  styleUrl: './creareditarcentroreciclaje.component.css'
})
export class CreareditarcentroreciclajeComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuario[] = [];
  centroReciclaje: CentroReciclaje = new CentroReciclaje(); 

  id: number = 0;
  edicion: boolean = false;

  listaFavoritos: { value: string; viewValue: string }[] = [
    { value: 'False', viewValue: 'False' },
    { value: 'True', viewValue: 'True' }
  ];

  constructor(
    private cS: CentroReciclajeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //trae los datos
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hdireccion: ['', Validators.required],
      hlatitud: ['', Validators.required],
      hlongitud: ['', Validators.required],
      hhorario: ['', Validators.required],
      hfavoritos: ['', Validators.required],
      husuario: ['', Validators.required]
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.centroReciclaje.idCentroReciclaje = this.form.value.hcodigo;
      this.centroReciclaje.direccion = this.form.value.hdireccion;
      this.centroReciclaje.latitud = this.form.value.hlatitud;
      this.centroReciclaje.longitud = this.form.value.hlongitud;
      //const time = this.form.value.hhorario;
      //this.centroReciclaje.horario = this.formatTimeToString(time);
      this.centroReciclaje.horario = this.form.value.hhorario;
      this.centroReciclaje.favoritos = this.form.value.hfavoritos;
      this.centroReciclaje.us.idUser = this.form.value.husuario;

      if (this.edicion) {
        this.cS.update(this.centroReciclaje).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.centroReciclaje).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['centroreciclaje']);
  }

  /*private formatTimeToString(time: string): string {
    // Asegúrate de que time esté en el formato HH:mm:ss
    return time; // Aquí simplemente retorna el string
  }*/

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idCentroReciclaje),
          hdireccion: new FormControl(data.direccion),
          hlatitud: new FormControl(data.latitud),
          hlongitud: new FormControl(data.longitud),
          hhorario: new FormControl(data.horario),
          hfavoritos: new FormControl(data.favoritos),
          husuario: new FormControl(data.us.idUser)
        });  
      });
    }
  }
}
