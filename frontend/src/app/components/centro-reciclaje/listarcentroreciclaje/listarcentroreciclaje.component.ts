import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CentroReciclaje } from '../../../models/CentroReciclaje';
import { CentroReciclajeService } from '../../../services/centro-reciclaje.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';

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
 
  centros: CentroReciclaje[] = [];
  pagedData: CentroReciclaje[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private map: any;
  private marker: any;
  role:String='';

  constructor(private cS: CentroReciclajeService, private router: Router, private lS: LoginService) { }

  ngOnInit(): void {
    this.role = this.lS.showRole();
    this.cS.list().subscribe(data => {
      this.centros = data;
      this.updatePagedData();
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
    // Actualizar los datos cuando se cambia de página
    this.paginator.page.subscribe(() => {
      this.updatePagedData();
    });
  }

  
  // Función para actualizar los datos según la página actual
  updatePagedData(): void {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedData = this.centros.slice(startIndex, endIndex);
  }

  getFormattedLocation(element: CentroReciclaje): string {
    return `(${element.latitud}, ${element.longitud})`;
  }

  

  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.centros = data;
        });
    });
  }

  isAdmi(){
    return this.role === 'ADMI';
  }
}