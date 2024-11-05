import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from'@angular/material/table';
import { TipoActividad } from '../../../models/TipoActividad';
import { TipoactividadService } from '../../../services/tipoactividad.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listartipoactividad',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterLink,MatPaginatorModule],
  templateUrl: './listartipoactividad.component.html',
  styleUrl: './listartipoactividad.component.css'
})

export class ListartipoactividadComponent implements OnInit{
  dataSource:MatTableDataSource<TipoActividad>=new MatTableDataSource()

  displayedColumns:string[]=['c1','c2','c3','accion01','accion02']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private taS:TipoactividadService){}

  ngOnInit(): void {
      this.taS.list().subscribe((data)=>{
        this.dataSource=new MatTableDataSource(data)
      });
      this.taS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id:number){
    this.taS.delete(id).subscribe((data)=>{
      this.taS.list().subscribe((data)=>{
        this.taS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

}
