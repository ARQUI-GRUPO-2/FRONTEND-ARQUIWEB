import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Actividad } from '../../../models/Actividad';
import { ActividadService } from '../../../services/actividad.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listaractividad',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './listaractividad.component.html',
  styleUrl: './listaractividad.component.css'
})
export class ListaractividadComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['c1','c2','c3','c4','c5','c6','c8','c9','c10','accion01','accion02']
  dataSource:MatTableDataSource<Actividad>= new MatTableDataSource()


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private aS: ActividadService) { }
  
  ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.aS.getList().subscribe((data)=>{
      this.dataSource.data = data;
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
 }

  eliminar(id:number){
    this.aS.delete(id).subscribe((data)=>{
      this.aS.list().subscribe((data)=>{
        this.aS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

}
