import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PromedioNotificacionesPorDiaUsuarioDTO } from '../../../models/PromedioNotificacionesPorDiaUsuarioDTO';
import { NotificacionService } from '../../../services/notificacion.service';

@Component({
  selector: 'app-promedionotificacionespordiausuario',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIcon],
  templateUrl: './promedionotificacionespordiausuario.component.html',
  styleUrl: './promedionotificacionespordiausuario.component.css'
})
export class PromedionotificacionespordiausuarioComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombres','promedio'];
  dataSource: MatTableDataSource<PromedioNotificacionesPorDiaUsuarioDTO> = new MatTableDataSource();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private nS: NotificacionService){}
  ngOnInit(): void {
    this.fetchNotiUsuario();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  fetchNotiUsuario():void{
    this.nS.getUsuarioNoti().subscribe(
      (data: PromedioNotificacionesPorDiaUsuarioDTO[]) => {
        this.dataSource.data = data;
      },
      (error) =>{
        console.error('Error fetching center data', error)
      }
    );
   } 
}
