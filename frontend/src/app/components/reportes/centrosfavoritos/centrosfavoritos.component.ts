import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CenterFavoriteDTO } from '../../../models/CenterFavoriteDTO';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CentroReciclajeService } from '../../../services/centro-reciclaje.service';
import { MatIcon } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-centrosfavoritos',
  standalone: true,
  imports:  [MatTableModule, MatPaginatorModule, MatIcon, BaseChartDirective],
  templateUrl: './centrosfavoritos.component.html',
  styleUrl: './centrosfavoritos.component.css'
})
export class CentrosfavoritosComponent implements OnInit {

  doughnutChartOptions: ChartOptions = { 
    responsive: true, 
  }; 
  doughnutChartLabels: string[] = []; 
  doughnutChartType: ChartType = 'doughnut'; 
  doughnutChartLegend = true; 
  doughnutChartData: ChartDataset[] = [];

  constructor(private cS: CentroReciclajeService) {} 
  ngOnInit(): void { 
    this.fetchCentroFavorito(); 
  } 

  fetchCentroFavorito(): void { 
  this.cS.getFavoritos().subscribe((data: CenterFavoriteDTO[]) => { 
    this.doughnutChartLabels = data.map(item => item.direccion); 
    this.doughnutChartData = [ 
      {
        data: data.map(item => item.cantidadFavoritos),
        label: 'Favoritos', 
        backgroundColor: [
            '#FFEB3B', // Amarillo
            '#F44336', // Rojo
            '#FFEB3B', 
            '#F44336', 
            '#FFEB3B', 
            '#F44336', 
            '#FFEB3B',
        ],
        borderColor: '#ffffff', 
        borderWidth: 1, 
  }
  ];
});
}

}