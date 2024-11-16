import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActividadesPorCentroDTO } from '../../../models/ActividadesPorCentroDTO';
import { ActividadService } from '../../../services/actividad.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType, Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-actividadesporcentro',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, BaseChartDirective],
  templateUrl: './actividadesporcentro.component.html',
  styleUrls: ['./actividadesporcentro.component.css']
})
export class ActividadesporcentroComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  dataSource: MatTableDataSource<ActividadesPorCentroDTO> = new MatTableDataSource();

  // Colores suaves
  private softColors = [
    '#A8D0E6', '#FFE156', '#6A0572', '#D4A5A5', '#F4A300', '#2D3142', '#A6E3E9', '#FF9F1C', '#6A0572', '#4B9CD3'
  ];

  
  barChartData: ChartData<'bar'> = {
    labels: [], 
    datasets: [
      {
        data: [], 
        label: 'Cantidad de Actividades',
        backgroundColor: [], 
        borderColor: [],     
        borderWidth: 1
      }
    ]
  };

  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      }
    }
  };

  constructor(private apcS: ActividadService) {}

  ngOnInit(): void {
    this.fetchActividadporCentro();
  }

  fetchActividadporCentro(): void {
    this.apcS.getActividadesporCentro().subscribe(
      (data: ActividadesPorCentroDTO[]) => {
        this.dataSource.data = data;
        
        // Configura los datos para el gráfico
        this.barChartData.labels = data.map(item => `Centro ID: ${item.id_centro_reciclaje}`);
        this.barChartData.datasets[0].data = data.map(item => item.numero_actividades);

        // Asigna los colores suaves a las barras, según la cantidad de centros
        this.barChartData.datasets[0].backgroundColor = this.getSoftColors(data.length);
        this.barChartData.datasets[0].borderColor = this.getSoftColors(data.length);

        // Actualiza el gráfico
        this.chart?.update();
      },
      (error) => {
        console.error('Error fetching actividad centro data', error);
      }
    );
  }

  // Función para asignar los colores suaves según la cantidad de barras
  private getSoftColors(numberOfBars: number): string[] {
    const selectedColors = [];
    for (let i = 0; i < numberOfBars; i++) {
      selectedColors.push(this.softColors[i % this.softColors.length]);
    }
    return selectedColors;
  }
}