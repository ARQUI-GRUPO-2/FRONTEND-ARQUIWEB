import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Noticias } from '../../../models/Noticias';
import { NoticiasService } from '../../../services/noticias.service';


@Component({
  selector: 'app-listarnoticias',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarnoticias.component.html',
  styleUrl: './listarnoticias.component.css'
})

export class ListarnoticiasComponent implements OnInit {
  dataSource: MatTableDataSource<Noticias>= new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private nS: NoticiasService) { }

  ngOnInit(): void {
    this.nS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
