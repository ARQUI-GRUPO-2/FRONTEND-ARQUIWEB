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
  styleUrl: './listarrecompensa.component.css',
})
export class ListarrecompensaComponent implements OnInit {
  dataSource: MatTableDataSource<Recompensas> = new MatTableDataSource();
  reclamaciones: Reclamaciones = new Reclamaciones();
  recompensas: Recompensas = new Recompensas();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  role: string = '';

  constructor(
    private rS: RecompensaService,
    private lS: LoginService,
    private recS: ReclamacionesService,
    private router: Router // Servicio para manejar reclamaciones
  ) {}

  ngOnInit(): void {
    //this.role = this.lS.showRole();

    this.rS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  reclamarRecompensa(recompensaId: number) {
    // Asignar el ID de la recompensa que se está reclamando
    this.reclamaciones.recompensa.idRecompensas = recompensaId;
  
    // Asignar el ID del usuario desde el servicio de login
    const userId = this.lS.getUserID();
    if (userId !== null && userId !== undefined) {
      this.reclamaciones.usuario.idUser = userId;
  
      // Insertar la reclamación en la base de datos
      this.recS.insert(this.reclamaciones).subscribe(() => {
        // Después de la inserción, actualizar la lista de reclamaciones
        this.recS.list().subscribe((data) => {
          this.recS.setList(data);
        });
      });
    } else {
      console.error('Error: El usuario no está autenticado.');
    }
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
