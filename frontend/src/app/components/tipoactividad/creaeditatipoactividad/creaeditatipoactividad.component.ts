import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TipoActividad } from '../../../models/TipoActividad';
import { TipoactividadService } from '../../../services/tipoactividad.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { tmplAstVisitAll } from '@angular/compiler';

@Component({
  selector: 'app-creaeditatipoactividad',
  standalone: true,
  imports: [MatInputModule, MatFormField, MatSelectModule, ReactiveFormsModule, CommonModule, MatButtonModule],
  templateUrl: './creaeditatipoactividad.component.html',
  styleUrl: './creaeditatipoactividad.component.css'
})
export class CreaeditatipoactividadComponent implements OnInit{
  form:FormGroup=new FormGroup({});
  tipoactividad:TipoActividad=new TipoActividad()

  id:number=0;
  edicion:boolean = false;

  constructor(
    private taS:TipoactividadService, 
    private formBuilder:FormBuilder, 
    private router:Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
      this.route.params.subscribe((data:Params)=>{
        this.id = data ['id'];
        this.edicion = data['id']!=null;

        this.init();
      });
      this.form=this.formBuilder.group({
        codigo:  [''],
        invitar: ['', Validators.required],
        reciclar:['', Validators.required],
      })
  }

  insertar():void{
    if(this.form.valid){
      this.tipoactividad.id_tipo_actividad=this.form.value.codigo;
      this.tipoactividad.invitacion=this.form.value.invitar;
      this.tipoactividad.reciclar=this.form.value.reciclar;
      if(this.edicion){
        this.taS.update(this.tipoactividad).subscribe((data)=>{
          this.taS.list().subscribe((data)=>{
            this.taS.setList(data);
          });
        });
      } else{
        this.taS.insert(this.tipoactividad).subscribe(data=>{
          this.taS.list().subscribe(data=>{
            this.taS.setList(data)
          });
        });
      }
    }
    this.router.navigate(['tipodeactividades'])
  }

  init(){
    if(this.edicion){
      this.taS.listId(this.id).subscribe((data)=>{
        this.form= new FormGroup({
          codigo: new FormControl(data.id_tipo_actividad),
          invitar: new FormControl(data.invitacion),
          reciclar: new FormControl(data.reciclar),
        });
      });
    }
  }
}
