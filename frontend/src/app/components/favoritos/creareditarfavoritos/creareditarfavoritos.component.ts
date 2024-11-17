import { CentroReciclaje } from './../../../models/CentroReciclaje';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {   FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators, } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/Usuario';
import { FavoritosService } from '../../../services/favoritos.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CentroReciclajeService } from '../../../services/centro-reciclaje.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Favoritos } from '../../../models/Favoritos';

@Component({
  selector: 'app-creareditarfavoritos',
  standalone: true,
  imports: [ MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './creareditarfavoritos.component.html',
  styleUrl: './creareditarfavoritos.component.css'
})
export class CreareditarfavoritosComponent implements OnInit {
  form:FormGroup=new FormGroup({});
  favoritos: Favoritos = new Favoritos();
  listaUsuario:Usuario[]=[];
  listaCentros:CentroReciclaje[]=[];

  id:number=0
  edicion:boolean=false;
  
  constructor(
    private formBuilder:FormBuilder, 
    private fS:FavoritosService,
    private route: ActivatedRoute,
    private router: Router,
    private uS: UsuarioService,
    private cS: CentroReciclajeService,
    
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      husuario: ['', Validators.required],
      hcentro: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuario = data;
    });
    this.cS.list().subscribe((data) => {
      this.listaCentros = data;
    });
}

  insertar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); 
      return; 
    }
    if (this.form.valid) {
      this.favoritos.idFavorito = this.form.value.hcodigo;
      this.favoritos.user.idUser = this.form.value.husuario;
      this.favoritos.centroReciclaje.idCentroReciclaje = this.form.value.hcentro;

      if (this.edicion) {
        this.fS.update(this.favoritos).subscribe((data) => {
          this.fS.list().subscribe((data) => {
            this.fS.setList(data);
          });
        });
      } else {
        this.fS.insert(this.favoritos).subscribe(data => {
          this.fS.list().subscribe(data => {
            this.fS.setList(data);
          });
        });
      }
    } 
    this.router.navigate(['favoritos']);
  }

  init() {
    if (this.edicion) {
      this.fS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
        hcodigo: new FormControl(data.idFavorito),
        husuario: new FormControl(data.user.idUser),
        hcentro: new FormControl(data.centroReciclaje.idCentroReciclaje),
     });
    });
    }
  }
}
