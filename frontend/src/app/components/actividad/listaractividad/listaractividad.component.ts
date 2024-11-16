import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Actividad } from '../../../models/Actividad';
import { ActividadService } from '../../../services/actividad.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listaractividad',
  standalone: true,
  imports: [MatIconModule, RouterLink, CommonModule,MatPaginatorModule,MatCardModule],
  templateUrl: './listaractividad.component.html',
  styleUrls: ['./listaractividad.component.css']  // Corrige 'styleUrl' a 'styleUrls'
})
export class ListaractividadComponent implements OnInit, AfterViewInit {
  // Lista normal de actividades
  actividades: Actividad[] = [];
  pagedData: Actividad[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private aS: ActividadService, private lS: LoginService) { }

  ngOnInit(): void {
     //this.role = this.lS.showRole();
    // Obtener las actividades
    this.aS.list().subscribe((data) => {
      this.actividades = data;
      this.updatePagedData();
    });
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
    this.pagedData = this.actividades.slice(startIndex, endIndex);
  }

  eliminar(id: number): void {
    this.aS.delete(id).subscribe(() => {
      // Después de eliminar, obtener la lista actualizada
      this.aS.list().subscribe((data) => {
        this.actividades = data;
        this.updatePagedData();  // Actualizar los datos mostrados
      });
    });
  }
   /*isAdmi(){
    return this.role === 'ADMI';
  }*/
}

