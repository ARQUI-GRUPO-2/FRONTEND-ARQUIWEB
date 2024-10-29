import { Component,OnInit } from '@angular/core';
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

@Component({
  selector: 'app-creareditarrecompensa',
  standalone: true,
  imports: [MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './creareditarrecompensa.component.html',
  styleUrl: './creareditarrecompensa.component.css'
})
export class CreareditarrecompensaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  recompensas: Recompensas = new Recompensas();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private rS: RecompensaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
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
      hnombre: ['', Validators.required],
      hcodigoqr: ['', Validators.required],
      hcolor: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hfechavencimiento: ['', Validators.required],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.recompensas.idRecompensas = this.form.value.hcodigo;
      this.recompensas.nombreRecompensa = this.form.value.hnombre;
      this.recompensas.codigoQR = this.form.value.hcodigoqr;
      this.recompensas.fechaVencimiento = this.form.value.hfecha;
      this.recompensas.descripcionRecompensa= this.form.value.hdescripcion;
      if (this.edicion) {
        this.rS.update(this.recompensas).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.recompensas).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['recompensas']);
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idRecompensas),
          hnombre: new FormControl(data.nombreRecompensa),
          hcodigoqr: new FormControl(data.codigoQR),
          hfecha: new FormControl(data.fechaVencimiento),
          hdescripcion: new FormControl(data.descripcionRecompensa),
        });
      });
    }
  }
}
