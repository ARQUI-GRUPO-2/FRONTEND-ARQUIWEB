import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CentroReciclaje } from '../../../models/CentroReciclaje';
import { CentroReciclajeService } from '../../../services/centro-reciclaje.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FavoritosService } from '../../../services/favoritos.service';

// Google Maps typings
declare var google: any;

@Component({
  selector: 'app-listarcentroreciclaje',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink, MatCardModule, MatPaginatorModule, CommonModule],
  templateUrl: './listarcentroreciclaje.component.html',
  styleUrls: ['./listarcentroreciclaje.component.css']
})
export class ListarcentroreciclajeComponent implements OnInit {
  dataSource: MatTableDataSource<CentroReciclaje> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private map: any;
  private marker: any;


  constructor(private cS: CentroReciclajeService, private router: Router) { }

  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.dataSource.data = data;
    });

    this.cS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });

    this.initMap();
  }

  // Inicialización del mapa con Google Maps
  initMap(): void {
    // Crea un nuevo mapa con Google Maps
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: -12.103852982642929, lng: -76.96305349525248 }, // Coordenadas iniciales
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  }

  // Mostrar marcador en el mapa
  showOnMap(lat: number, lng: number): void {
    const position = { lat, lng };

    // Si ya existe un marcador, actualizamos su posición
    if (this.marker) {
      this.marker.setPosition(position);
    } else {
      // Si no existe marcador, creamos uno nuevo
      this.marker = new google.maps.Marker({
        position: position,
        map: this.map,
        title: 'Centro de reciclaje'
      });
    }

    // Centramos el mapa en la nueva posición del marcador
    this.map.setCenter(position);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getFormattedLocation(element: CentroReciclaje): string {
    return `(${element.latitud}, ${element.longitud})`;
  }

  toggleFavorite(idCentroReciclaje: number): void {
      this.router.navigate(['/favoritos/nuevo'], { queryParams: { centroReciclajeId: idCentroReciclaje } });
    }


    eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
}