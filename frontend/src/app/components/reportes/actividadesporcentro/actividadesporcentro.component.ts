import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActividadesPorCentroDTO } from '../../../models/ActividadesPorCentroDTO';
import { ActividadService } from '../../../services/actividad.service';

@Component({
  selector: 'app-actividadesporcentro',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule],
  templateUrl: './actividadesporcentro.component.html',
  styleUrl: './actividadesporcentro.component.css'
})
export class ActividadesporcentroComponent implements OnInit, AfterViewInit {
displayedColumns: string[] = ['id','cantidad'];
dataSource: MatTableDataSource<ActividadesPorCentroDTO> = new MatTableDataSource();

@ViewChild(MatPaginator) paginator!: MatPaginator;

constructor(private apcS:ActividadService){}
ngOnInit(): void {
  this.fetchActividadporCentro();
}
ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
}
fetchActividadporCentro():void{
  this.apcS.getActividadesporCentro().subscribe(
    (data: ActividadesPorCentroDTO[]) => {
      this.dataSource.data = data;
    },
    (error) =>{
      console.error('Error fetching actividad centro data', error)
    }
  );
 }
}
