import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Reclamaciones } from '../../../models/Reclamaciones';
import { ReclamacionesService } from '../../../services/reclamaciones.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarreclamaciones',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    RouterLink,
    MatCardModule,
    MatPaginatorModule,
    CommonModule,
  ],
  templateUrl: './listarreclamaciones.component.html',
  styleUrl: './listarreclamaciones.component.css',
})
export class ListarreclamacionesComponent implements OnInit {
  dataSource: MatTableDataSource<Reclamaciones> = new MatTableDataSource();

  constructor(private rS: ReclamacionesService, private ls: LoginService) {}
  role: String = '';

  ngOnInit(): void {
    const userId = this.ls.getID();
    this.role = this.ls.showRole();

    if (this.role === 'ADMI') {
      this.rS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    } else if (this.role === 'CLIENTE' && userId) {
      this.rS.listId(userId).subscribe((reclamaciones) => {
        this.dataSource.data = [reclamaciones];
      });
      
    }else {
      console.error('No se pudo obtener el rol o ID del usuario');
    }
  }

  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
        this.dataSource.data = data;
      });
    });
  }

  isAdmi(): boolean {
    return this.role === 'ADMI';
  }
}
