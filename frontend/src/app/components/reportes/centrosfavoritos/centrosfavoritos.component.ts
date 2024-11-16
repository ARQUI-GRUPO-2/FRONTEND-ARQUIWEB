import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CentroReciclajeService } from '../../../services/centro-reciclaje.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType, Chart, registerables } from 'chart.js';
import { CenterFavoriteDTO } from '../../../models/CenterFavoriteDTO';

Chart.register(...registerables);

@Component({
  selector: 'app-centrosfavoritos',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, BaseChartDirective],
  templateUrl: './centrosfavoritos.component.html',
  styleUrls: ['./centrosfavoritos.component.css']
})
export class CentrosfavoritosComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  dataSource: MatTableDataSource<CenterFavoriteDTO> = new MatTableDataSource();

  // Colores suaves
  private softColors = [
    '#A8D0E6', '#FFE156', '#6A0572', '#D4A5A5', '#F4A300', '#2D3142', '#A6E3E9', '#FF9F1C', '#6A0572', '#4B9CD3'
  ];

  // Datos para el gráfico
  barChartData: ChartData<'bar'> = {
    labels: [], 
    datasets: [
      {
        data: [], 
        label: 'Cantidad de Favoritos',
        backgroundColor: [], 
        borderColor: [],     
        borderWidth: 1
      }
    ]
  };

  // Opciones del gráfico
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

  constructor(private cS: CentroReciclajeService) {}

  ngOnInit(): void {
    this.fetchCentroFavorito();
  }

  fetchCentroFavorito(): void {
    this.cS.getFavoritos().subscribe(
      (data: CenterFavoriteDTO[]) => {
        this.dataSource.data = data;
        
        // Configura los datos para el gráfico
        this.barChartData.labels = data.map(item => item.direccion);  // Direcciones de los centros
        this.barChartData.datasets[0].data = data.map(item => item.cantidadFavoritos);  // Cantidad de favoritos

        // Asigna los colores suaves a las barras, según la cantidad de centros
        this.barChartData.datasets[0].backgroundColor = this.getSoftColors(data.length);
        this.barChartData.datasets[0].borderColor = this.getSoftColors(data.length);

        // Actualiza el gráfico
        this.chart?.update();
      },
      (error) => {
        console.error('Error fetching centro favorito data', error);
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
