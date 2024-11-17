import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Recompensas } from '../../../models/Recompensas';
import { RecompensaService } from '../../../services/recompensa.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { ReclamacionesService } from '../../../services/reclamaciones.service';
import { Reclamaciones } from '../../../models/Reclamaciones';
import { Usuario } from '../../../models/Usuario';

@Component({
  selector: 'app-listarrecompensa',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    RouterLink,
    MatCardModule,
    MatPaginatorModule,
    CommonModule,
  ],
  templateUrl: './listarrecompensa.component.html',
  styleUrls: ['./listarrecompensa.component.css']
})
export class ListarrecompensaComponent implements OnInit {
  recompensas: Recompensas[] = [];
  pagedData: Recompensas[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  role: string = '';

  constructor(
    private rS: RecompensaService,
    private lS: LoginService,
    private router: Router // Servicio para manejar reclamaciones
  ) {}

  ngOnInit(): void {
    //this.role = this.lS.showRole();

    this.rS.list().subscribe((data) => {
      this.recompensas = data;
      this.updatePagedData();
    });
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      this.updatePagedData();
    });
  }

  updatePagedData(): void {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedData = this.recompensas.slice(startIndex, endIndex);
  }

  eliminar(id: number) {
    this.rS.delete(id).subscribe(() => {
      this.rS.list().subscribe((data) => {
        this.recompensas = data;
        this.updatePagedData();
      });
    });
  }  
  
  // reclamarRecompensa(recompensaId: number) {
  //   this.reclamaciones.recompensa.idRecompensas =
  //     this.recompensas.idRecompensas;
  //   this.reclamaciones.usuario.idUser = this.lS.getUserID(); // Asigna el id de la recompensa a la variable de la clase Reclamaciones

  //   this.recS.insert(this.reclamaciones).subscribe(() => {
  //     this.recS.list().subscribe((data) => {
  //       this.recS.setList(data);
  //     });
  //   });
  // }

  isAdmi(): boolean {
    return this.role === 'ADMI';
  }
}
