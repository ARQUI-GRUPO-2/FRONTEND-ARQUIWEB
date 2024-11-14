import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActividadesPorUsuarioDTO } from '../../../models/ActividadesPorUsuarioDTO';
import { ActividadService } from '../../../services/actividad.service';

@Component({
  selector: 'app-actividadesporusuario',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './actividadesporusuario.component.html',
  styleUrl: './actividadesporusuario.component.css'
})
export class ActividadesporusuarioComponent implements OnInit, AfterViewInit{
displayedColumns: string[] = ['id','cantidad','puntos'];
dataSource: MatTableDataSource<ActividadesPorUsuarioDTO> = new MatTableDataSource();

@ViewChild(MatPaginator) paginator!: MatPaginator;

constructor(private apuS:ActividadService){}
ngOnInit(): void {
  this.fetchActividadporUsuario();
}
ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
}
fetchActividadporUsuario():void{
  this.apuS.getActividadesporUsuario().subscribe(
    (data: ActividadesPorUsuarioDTO[]) => {
      this.dataSource.data = data;
    },  
    (error) =>{
      console.error('Error fetching actividad usuario data', error)
    }
  );
 }

}
