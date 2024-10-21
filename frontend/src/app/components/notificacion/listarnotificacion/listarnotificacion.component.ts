import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Notificacion } from '../../../models/Notificacion';
import { NotificacionService } from '../../../services/notificacion.service';

@Component({
  selector: 'app-listarnotificacion',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarnotificacion.component.html',
  styleUrl: './listarnotificacion.component.css'
})
export class ListarnotificacionComponent {
  dataSource:MatTableDataSource<Notificacion> =new MatTableDataSource();

  displayedColumns: string[]=['c1','c2','c3','c4','c5','c6']
  
  constructor(private nS: NotificacionService) {}
  ngOnInit(): void {
    this.nS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
    });
  }

}
