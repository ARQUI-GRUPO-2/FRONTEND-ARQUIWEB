import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CentroReciclaje } from '../../../models/CentroReciclaje';
import { CentroReciclajeService } from '../../../services/centro-reciclaje.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet'; // Importar Leaflet

@Component({
  selector: 'app-listarcentroreciclaje',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink, MatCardModule, MatPaginatorModule,CommonModule],
  templateUrl: './listarcentroreciclaje.component.html',
  styleUrls: ['./listarcentroreciclaje.component.css']
})
export class ListarcentroreciclajeComponent implements OnInit {
  dataSource: MatTableDataSource<CentroReciclaje> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7', 'accion01','accion02'];

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

  initMap(): void {
    this.map = L.map('map', {
      minZoom: 0,
      maxZoom: 100 // Ajustar el nivel máximo de zoom
    });

    const cartodbAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>';
    const positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: cartodbAttribution
    }).addTo(this.map);

    this.map.setView([-12.103852982642929, -76.96305349525248], 19); // Inicializa el mapa con el centro y zoom por defecto
  }

  // Mostrar marcador en el mapa
  showOnMap(lat: number, lng: number): void {
    const position: L.LatLngTuple = [lat, lng];

    if (this.marker) {
      this.marker.setLatLng(position);
    } else {
      this.marker = L.marker(position).addTo(this.map);
    }

    this.map.setView(position, 15);
  }
  

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getFormattedLocation(element: CentroReciclaje): string {
    return `(${element.latitud}, ${element.longitud})`;
  }
   // Método para manejar favoritos (corazón)
   toggleFavorite(element: CentroReciclaje): void {
    element.favoritos = !element.favoritos;
    // Aquí puedes hacer una llamada al servicio para guardar este cambio si es necesario
    this.router.navigate(['/centroreciclaje/ediciones', element.idCentroReciclaje]);

  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }

 
}
