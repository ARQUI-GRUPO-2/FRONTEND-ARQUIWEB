import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Actividad } from '../../../models/Actividad';
import { ActividadService } from '../../../services/actividad.service';

@Component({
  selector: 'app-listaractividad',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listaractividad.component.html',
  styleUrl: './listaractividad.component.css'
})
export class ListaractividadComponent implements OnInit {
  dataSource:MatTableDataSource<Actividad>= new MatTableDataSource()

  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7','c8','c9','c10']
  constructor(private aS: ActividadService) { }
  
  ngOnInit(): void {
    this.aS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

}
