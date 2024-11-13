import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Notificaciones } from '../../../models/Notificaciones';
import { NotificacionService } from '../../../services/notificacion.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarnotificacion',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink, MatCardModule, MatPaginatorModule,CommonModule],
  templateUrl: './listarnotificacion.component.html',
  styleUrl: './listarnotificacion.component.css'
})

export class ListarnotificacionComponent implements OnInit {
  dataSource:MatTableDataSource<Notificaciones> =new MatTableDataSource();

  displayedColumns: string[]=['c1','c2','c3','c4','c5','c6','accion01','accion02']
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private nS: NotificacionService) {}
  ngOnInit(): void {
    this.nS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.nS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.nS.delete(id).subscribe((data) => {
      this.nS.list().subscribe((data) => {
        this.nS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

}
