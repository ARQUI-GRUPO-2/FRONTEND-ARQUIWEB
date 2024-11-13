import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CenterUsersDTO } from '../../../models/CenterUsersDTO';
import { CentroReciclajeService } from '../../../services/centro-reciclaje.service';

@Component({
  selector: 'app-centrosusuarios',
  standalone: true,
  imports:  [MatTableModule, MatPaginatorModule],
  templateUrl: './centrosusuarios.component.html',
  styleUrl: './centrosusuarios.component.css'
})

export class CentrosusuariosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['direccion','cantidadUser'];
  dataSource: MatTableDataSource<CenterUsersDTO> = new MatTableDataSource();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private cS: CentroReciclajeService){}
  ngOnInit(): void {
    this.fetchCentroUsuario();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  fetchCentroUsuario():void{
    this.cS.getUsuarios().subscribe(
      (data: CenterUsersDTO[]) => {
        this.dataSource.data = data;
      },
      (error) =>{
        console.error('Error fetching center data', error)
      }
    );
   } 

}
