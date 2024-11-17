import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { FavoritosService } from '../../../services/favoritos.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Favoritos } from '../../../models/Favoritos';

@Component({
  selector: 'app-listarfavoritos',
  standalone: true,
  imports: [    MatCardModule, 
    MatIconModule, 
    MatButtonModule,  // Asegúrate de que este módulo está importado
    RouterLink, 
    CommonModule],
  templateUrl: './listarfavoritos.component.html',
  styleUrl: './listarfavoritos.component.css'
})
export class ListarfavoritosComponent implements OnInit {
  dataSource: MatTableDataSource<Favoritos> = new MatTableDataSource();
  
  displayedColumns:string[]=['c1','c2','accion01','accion02']

  constructor(private fS: FavoritosService) { }

  ngOnInit(): void {
    this.fS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.fS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.fS.delete(id).subscribe((data) => {
      this.fS.list().subscribe((data) => {
        this.fS.setList(data);
      });
    });
  }
}
