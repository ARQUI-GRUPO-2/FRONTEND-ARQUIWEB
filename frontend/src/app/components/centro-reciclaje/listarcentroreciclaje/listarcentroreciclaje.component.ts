import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CentroReciclaje } from '../../../models/CentroReciclaje';
import { CentroReciclajeService } from '../../../services/centro-reciclaje.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

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
  
  constructor(private cS: CentroReciclajeService) { }

  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.dataSource.data = data;
    });

    this.cS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
}
