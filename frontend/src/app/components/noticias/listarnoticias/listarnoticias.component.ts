import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Noticias } from '../../../models/Noticias';
import { NoticiasService } from '../../../services/noticias.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-listarnoticias',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink, MatCardModule],
  templateUrl: './listarnoticias.component.html',
  styleUrl: './listarnoticias.component.css'
})

export class ListarnoticiasComponent implements OnInit {
  dataSource: MatTableDataSource<Noticias>= new MatTableDataSource();
  selectedNoticia: Noticias | null = null;

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'accion01','accion02'];

  constructor(private nS: NoticiasService) { }

  ngOnInit(): void {
    this.nS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.nS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.nS.delete(id).subscribe((data) => {
      this.nS.list().subscribe((data) => {
        this.nS.setList(data);
      });
    });
  }

  verMas(id: number): void {
    this.nS.listId(id).subscribe(noticia => {
      this.selectedNoticia = noticia;  // Carga la noticia completa seleccionada
    });
  }

  cerrarDetalles(): void {
    this.selectedNoticia = null;  // Cierra el detalle cuando ya no se quiera ver
  }
}
