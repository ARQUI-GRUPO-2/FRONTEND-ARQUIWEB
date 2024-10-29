import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CentroReciclajeService } from '../../../services/centro-reciclaje.service';
import { CentroReciclaje } from './../../../models/CentroReciclaje';
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker'

@Component({
  selector: 'app-creareditarcentroreciclaje',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, ReactiveFormsModule, CommonModule, NgxMaterialTimepickerModule], 
  templateUrl: './creareditarcentroreciclaje.component.html',
  styleUrl: './creareditarcentroreciclaje.component.css'
})
export class CreareditarcentroreciclajeComponent {
  form: FormGroup = new FormGroup({});
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;

      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hdireccion: ['', Validators.required],
      hlatitud: ['', Validators.required],
      hlongitud: ['', Validators.required],
      hhorario: ['', Validators.required],
      hfavoritos: ['', Validators.required]
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.centroReciclaje.idCentroReciclaje = this.form.value.hcodigo;
      this.centroReciclaje.direccion = this.form.value.hdireccion;
      this.centroReciclaje.latitud = this.form.value.hlatitud;
      this.centroReciclaje.longitud = this.form.value.hlongitud;
      this.centroReciclaje.horario = this.form.value.hhorario;
      this.centroReciclaje.favoritos = this.form.value.hfavoritos;
    //  this.centroReciclaje.idUser = this.form.value.idUser;

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
    this.router.navigate(['centro-reciclaje']);
  }
    

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idCentroReciclaje),
          htitulo: new FormControl(data.direccion),
          hinformacion: new FormControl(data.latitud),
          hlongitud: new FormControl(data.longitud),
          hhorario: new FormControl(data.horario),
          hfavoritos: new FormControl(data.favoritos)

        });  
      });
    }
  }
}
