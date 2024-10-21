import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from'@angular/material/table';
import { TipoActividad } from '../../../models/TipoActividad';
import { TipoactividadService } from '../../../services/tipoactividad.service';

@Component({
  selector: 'app-listartipoactividad',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listartipoactividad.component.html',
  styleUrl: './listartipoactividad.component.css'
})
export class ListartipoactividadComponent implements OnInit{
  dataSource:MatTableDataSource<TipoActividad>=new MatTableDataSource()

  displayedColumns:string[]=['c1','c2','c3']
  
  constructor(private taS:TipoactividadService){}
  ngOnInit(): void {
      this.taS.list().subscribe((data)=>{
        this.dataSource=new MatTableDataSource(data)
      });
  }


}
