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
import { Recompensas } from '../../../models/Recompensas';
import { RecompensaService } from '../../../services/recompensa.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActividadService } from '../../../services/actividad.service';
import { Actividad } from '../../../models/Actividad';
import { LoginService } from '../../../services/login.service';


@Component({
  selector: 'app-creareditarrecompensa',
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
  templateUrl: './creareditarrecompensa.component.html',
  styleUrls: ['./creareditarrecompensa.component.css'],
})
export class CreareditarrecompensaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  recompensas: Recompensas = new Recompensas();
  listaActividad: Actividad[] = [];
  id: number = 0;
  edicion: boolean = false;
  role: string = '';

  constructor(
    private rS: RecompensaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private aS: ActividadService,
    private lS: LoginService
  ) {}

  ngOnInit(): void {
    this.role = this.lS.showRole();

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
      
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hfecha: ['', Validators.required],
      hactividad: [null], // Permitir nulo por defecto
    });

    this.aS.list().subscribe((data) => {
      this.listaActividad = data;
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.recompensas.idRecompensas = this.form.value.hcodigo;
      this.recompensas.nombreRecompensa = this.form.value.hnombre;
      this.recompensas.descripcionRecompensa = this.form.value.hdescripcion;
      this.recompensas.fechaVencimiento = this.form.value.hfecha;

      // Permitir idActividad nulo al registrar, requerirlo al editar
      this.recompensas.ac = this.form.value.hactividad
        ? ({ idActividad: this.form.value.hactividad } as Actividad)
        : null;

      if (this.edicion) {
        this.rS.update(this.recompensas).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.recompensas).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }

      this.router.navigate(['recompensas']);
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          hcodigo: new FormControl(data.idRecompensas),
          hnombre: new FormControl(data.nombreRecompensa, Validators.required),
          hdescripcion: new FormControl(
            data.descripcionRecompensa,
            Validators.required
          ),
          hfecha: new FormControl(data.fechaVencimiento, Validators.required),
          hactividad: new FormControl(
            data.ac ? data.ac.idActividad : null,
            Validators.required
          ), // Requerir idActividad en edición
        });

        // Si es cliente, deshabilitamos todos los campos excepto el campo de actividad
        if (this.role === 'CLIENTE') {
          this.form.get('hcodigo')?.disable();
          this.form.get('hnombre')?.disable();
          this.form.get('hdescripcion')?.disable();
          this.form.get('hcodigoqr')?.disable();
          this.form.get('hfecha')?.disable();
        }
      });
    }
  }

    // Función para verificar si el rol es cliente
    isCliente(): boolean {
      return this.role === 'CLIENTE';
    }
  
    /* Función para verificar si el rol es admin
    isAdmin(): boolean {
      return this.role === 'ADMI';
    } */
}
