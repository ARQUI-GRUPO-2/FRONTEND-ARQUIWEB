import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Noticias } from '../../../models/Noticias';
import { NoticiasService } from '../../../services/noticias.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creareditarnoticias',
  standalone: true,
  imports: [MatInputModule,MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './creareditarnoticias.component.html',
  styleUrl: './creareditarnoticias.component.css',
})
export class CreareditarnoticiasComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  noticias: Noticias = new Noticias();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private nS: NoticiasService,
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
      htitulo: ['', Validators.required],
      hinformacion: ['', Validators.required],
      hfechaPublicacion: ['', Validators.required],
    });
  }

  insertar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Marca todos los controles como tocados para disparar las validaciones
      return; // Detiene la ejecución si el formulario no es válido
    }
    
    if (this.form.valid) {
      this.noticias.idNoticias = this.form.value.hcodigo;
      this.noticias.titulo = this.form.value.htitulo;
      this.noticias.informacion = this.form.value.hinformacion;
      this.noticias.fechaPublicacion = this.form.value.hfechaPublicacion;

      if (this.edicion) {
        this.nS.update(this.noticias).subscribe((data) => {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
          });
        });
      } else {
        this.nS.insert(this.noticias).subscribe((data) => {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['noticias']);
  }
    

  init() {
    if (this.edicion) {
      this.nS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idNoticias),
          htitulo: new FormControl(data.titulo),
          hinformacion: new FormControl(data.informacion),
          hfechaPublicacion: new FormControl(data.fechaPublicacion),
        });  
      });
    }
  }
}