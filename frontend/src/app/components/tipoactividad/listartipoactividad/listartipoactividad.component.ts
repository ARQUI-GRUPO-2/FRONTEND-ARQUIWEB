import { Component, OnInit } from '@angular/core';
import { TipoActividad } from '../../../models/TipoActividad';
import { TipoactividadService } from '../../../services/tipoactividad.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listartipoactividad',
  standalone: true,
  imports: [MatPaginatorModule, MatCardModule,MatIconModule,RouterLink,CommonModule],
  templateUrl: './listartipoactividad.component.html',
  styleUrls: ['./listartipoactividad.component.css']
})
export class ListartipoactividadComponent implements OnInit {
  actividades: TipoActividad[] = []; // Almacena todas las actividades
  pagedData: TipoActividad[] = []; // Datos para la página actual del paginador
  pageSize: number = 6; // Tamaño de la página
  currentPage: number = 0; // Página actual

  constructor(private taS: TipoactividadService) {}

  ngOnInit(): void {
    this.taS.list().subscribe((data) => {
      this.actividades = data;
      this.updatePagedData();
    });
  }

  eliminar(id: number): void {
    this.taS.delete(id).subscribe(() => {
      this.taS.list().subscribe((data) => {
        this.actividades = data;
        this.updatePagedData();
      });
    });
  }

  /** Método que actualiza los datos mostrados según la página actual */
  updatePagedData(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.actividades.slice(startIndex, endIndex);
  }

  /** Maneja el evento de cambio de página */
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedData();
  }
}
