import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/rol.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarroles',
  standalone: true,
  imports: [MatPaginatorModule, MatCardModule, MatIconModule, RouterLink, CommonModule],
  templateUrl: './listarroles.component.html',
  styleUrls: ['./listarroles.component.css'],
})
export class ListarrolesComponent implements OnInit {
  roles: Rol[] = []; // Lista completa de roles
  pagedData: Rol[] = []; // Datos para la página actual
  pageSize: number = 6; // Cantidad de tarjetas por página
  currentPage: number = 0; // Página actual

  constructor(private rolService: RolService) {}

  ngOnInit(): void {
    this.rolService.list().subscribe((data) => {
      this.roles = data;
      this.updatePagedData();
    });
  }

  eliminar(id: number): void {
    this.rolService.delete(id).subscribe(() => {
      this.rolService.list().subscribe((data) => {
        this.roles = data;
        this.updatePagedData();
      });
    });
  }

  /** Actualiza los datos mostrados según la página actual */
  updatePagedData(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.roles.slice(startIndex, endIndex);
  }

  /** Maneja el evento de cambio de página */
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedData();
  }
}
