import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CenterUsersDTO } from '../../../models/CenterUsersDTO';
import { CentroReciclajeService } from '../../../services/centro-reciclaje.service';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-centrosusuarios',
  standalone: true,
  imports:  [MatTableModule, BaseChartDirective],
  templateUrl: './centrosusuarios.component.html',
  styleUrl: './centrosusuarios.component.css'
})

export class CentrosusuariosComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = []; 
  barChartType: ChartType = 'bar'; 
  barChartLegend = true; 
  barChartData: ChartDataset[] = [];
  
  constructor(private cS: CentroReciclajeService){}
  ngOnInit(): void {
    this.fetchCentroUsuario();
  }

  fetchCentroUsuario():void{
    this.cS.getUsuarios().subscribe((data: CenterUsersDTO[]) => {
      this.barChartLabels = data.map(item => item.direccion);
      this.barChartData = [
        {
          data: data.map(item => item.username),
          label: 'Usuarios',
          backgroundColor: [
            '#4CAF50', // Verde
            '#2196F3', // Azul
            '#4CAF50', 
            '#2196F3', 
            '#4CAF50', 
            '#2196F3', 
            '#4CAF50',
          ],
          borderColor: 'rgba(173, 216, 230, 1)', 
        borderWidth: 1,
        }
      ];
    });
  } 
}
