import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Recompensas } from '../../../models/Recompensas';
import { RecompensaService } from '../../../services/recompensa.service';

@Component({
  selector: 'app-listarrecompensa',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarrecompensa.component.html',
  styleUrl: './listarrecompensa.component.css'
})
export class ListarrecompensaComponent implements OnInit{
  dataSource: MatTableDataSource<Recompensas>= new MatTableDataSource();

  displayedColumns: string[]=['c1','c2','c3','c4']

  constructor(private rS: RecompensaService) {}

  ngOnInit(): void {
    this.rS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
}