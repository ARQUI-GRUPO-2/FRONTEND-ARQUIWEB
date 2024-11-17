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

  constructor(private rS: ReclamacionesService) {}

  ngOnInit(): void {
    //this.role = this.lS.showRole();

    this.rS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}
