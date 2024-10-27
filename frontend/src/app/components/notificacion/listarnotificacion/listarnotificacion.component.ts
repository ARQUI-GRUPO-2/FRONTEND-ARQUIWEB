import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Notificacion } from '../../../models/Notificacion';
import { NotificacionService } from '../../../services/notificacion.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listarnotificacion',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './listarnotificacion.component.html',
  styleUrl: './listarnotificacion.component.css'
})

export class ListarnotificacionComponent {
  dataSource:MatTableDataSource<Notificacion> =new MatTableDataSource();

  displayedColumns: string[]=['c1','c2','c3','c4','c5','c6','accion01','accion02']
  
  constructor(private nS: NotificacionService) {}
  ngOnInit(): void {
    this.nS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
    });
    this.nS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  
  eliminar(id: number) {
    this.nS.delete(id).subscribe((data) => {
      this.nS.list().subscribe((data) => {
        this.nS.setList(data);
      });
    });
  }

}
