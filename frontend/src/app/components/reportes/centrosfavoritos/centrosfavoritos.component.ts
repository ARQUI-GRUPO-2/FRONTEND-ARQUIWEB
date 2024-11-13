import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CenterFavoriteDTO } from '../../../models/CenterFavoriteDTO';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CentroReciclajeService } from '../../../services/centro-reciclaje.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-centrosfavoritos',
  standalone: true,
  imports:  [MatTableModule, MatPaginatorModule, MatIcon],
  templateUrl: './centrosfavoritos.component.html',
  styleUrl: './centrosfavoritos.component.css'
})
export class CentrosfavoritosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['direccion','cantidadFav'];
  dataSource: MatTableDataSource<CenterFavoriteDTO> = new MatTableDataSource();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private cS: CentroReciclajeService){}
  ngOnInit(): void {
    this.fetchCentroFavorito();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  fetchCentroFavorito():void{
    this.cS.getFavoritos().subscribe(
      (data: CenterFavoriteDTO[]) => {
        this.dataSource.data = data;
      },
      (error) =>{
        console.error('Error fetching center data', error)
      }
    );
   } 

}
