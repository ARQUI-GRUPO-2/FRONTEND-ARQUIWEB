import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ActividadesporcentroComponent } from './actividadesporcentro/actividadesporcentro.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet, ActividadesporcentroComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit{
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {
      
  }
}
