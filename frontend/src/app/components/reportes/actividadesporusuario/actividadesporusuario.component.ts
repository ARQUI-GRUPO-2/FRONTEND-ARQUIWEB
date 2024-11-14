import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActividadesPorUsuarioDTO } from '../../../models/ActividadesPorUsuarioDTO';
import { ActividadService } from '../../../services/actividad.service';
import { BaseChartDirective} from 'ng2-charts';
import { ChartData, ChartOptions, ChartType, Chart, registerables} from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-actividadesporusuario',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,BaseChartDirective],
  templateUrl: './actividadesporusuario.component.html',
  styleUrl: './actividadesporusuario.component.css'
})
export class ActividadesporusuarioComponent implements OnInit, AfterViewInit{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Configuración para el gráfico de barras
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Cantidad de Actividades' },//backgroundColor: 'rgba(7, 71, 164)'
      { data: [], label: 'Puntos Totales'}//backgroundColor: 'rgba(9, 204, 3)' 
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apuS: ActividadService) {}

  ngOnInit(): void {
    this.fetchActividadporUsuario();
  }

  ngAfterViewInit(): void {}

  fetchActividadporUsuario(): void {
    this.apuS.getActividadesporUsuario().subscribe(
      (data: ActividadesPorUsuarioDTO[]) => {
        // Configura los datos para el gráfico
        this.barChartData.labels = data.map(item => `ID Usuario: ${item.id_user}`);
        this.barChartData.datasets[0].data = data.map(item => item.numeroactividades);
        this.barChartData.datasets[1].data = data.map(item => item.total_puntos);

        // Actualiza el gráfico
        this.chart?.update();
      },
      (error) => {
        console.error('Error fetching actividad usuario data', error);
      }
    );
  }

}
