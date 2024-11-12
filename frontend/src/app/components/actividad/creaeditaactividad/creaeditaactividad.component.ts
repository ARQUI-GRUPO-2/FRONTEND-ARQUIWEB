import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Actividad } from '../../../models/Actividad';
import { ActividadService } from '../../../services/actividad.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from '../../../models/Usuario';
import { CentroReciclaje } from '../../../models/CentroReciclaje';
import { TipoActividad } from '../../../models/TipoActividad';
import { UsuarioService } from '../../../services/usuario.service';
import { CentroReciclajeService } from '../../../services/centro-reciclaje.service';
import { TipoactividadService } from '../../../services/tipoactividad.service';

@Component({
  selector: 'app-creaeditaactividad',
  standalone: true,
  imports: [MatInputModule, MatFormField, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './creaeditaactividad.component.html',
  styleUrl: './creaeditaactividad.component.css'
})
export class CreaeditaactividadComponent implements OnInit {
  form:FormGroup=new FormGroup({});
  actividad:Actividad=new Actividad()
  listaUsuarios: Usuario[]=[];
  listaCentros: CentroReciclaje[]=[];
  listaTipoActividad: TipoActividad[]=[];

  id:number =0;
  edicion:boolean = false;

  listaUbicaciones:{value:string, viewValue:string}[]=[
    {value:'centro1', viewValue:'centro1'},
    {value:'centro2', viewValue:'centro2'},
    {value:'centro3', viewValue:'centro3'}
  ]

  constructor(

    private aS:ActividadService, 
    private formBuilder:FormBuilder, 
    private router:Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private cS: CentroReciclajeService,
    private taS: TipoactividadService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id = data ['id'];
      this.edicion = data['id']!=null;

      this.init();
    });
      this.form=this.formBuilder.group({
      codigo: [''],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      nombre: ['', Validators.required],
      puntos: ['', Validators.required],
      cantidad: ['', Validators.required],
      ubicacion: ['', Validators.required],
      usuarios: ['', Validators.required],
      centros: ['', Validators.required],
      tipoactividad: ['', Validators.required]
      });
      this.uS.list().subscribe((data) => {
        this.listaUsuarios = data;
      });
      this.cS.list().subscribe((data) => {
        this.listaCentros = data;
      });
      this.taS.list().subscribe((data) => {
        this.listaTipoActividad = data;
      });
  }

  insertar(): void {
    if (this.form.valid) {
      this.actividad.idActividad=this.form.value.codigo;
      this.actividad.fecha_recepcion=this.form.value.fecha;
      this.actividad.descripcion=this.form.value.descripcion;
      this.actividad.nombre=this.form.value.nombre;
      this.actividad.puntos=this.form.value.puntos;
      this.actividad.cantidad=this.form.value.cantidad;
      this.actividad.ubicacion=this.form.value.ubicacion;
      this.actividad.u.idUser = this.form.value.usuarios;
      this.actividad.cr.idCentroReciclaje = this.form.value.centros;
      this.actividad.ta.id_tipo_actividad = this.form.value.tipoactividad;
      if(this.edicion){
        this.aS.update(this.actividad).subscribe((data)=>{
          this.aS.list().subscribe((data)=>{
            this.aS.setList(data);
          });
        });
      } else {
        this.aS.insert(this.actividad).subscribe(data=>{
          this.aS.list().subscribe(data=>{
            this.aS.setList(data)
          });
        });
      }
      
  }
  this.router.navigate(['actividades'])
}

  init(){
    if(this.edicion){
      this.aS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          codigo: new FormControl(data.idActividad),
          fecha: new FormControl(data.fecha_recepcion),
          descripcion: new FormControl(data.descripcion),
          nombre: new FormControl(data.nombre),
          puntos: new FormControl(data.puntos),
          cantidad: new FormControl(data.cantidad),
          ubicacion: new FormControl(data.ubicacion),
          usuarios: new FormControl(data.u.idUser),
          centros: new FormControl(data.cr.idCentroReciclaje),
          tipoactividad: new FormControl(data.ta.id_tipo_actividad)

        });
      });
    }
  }
}
