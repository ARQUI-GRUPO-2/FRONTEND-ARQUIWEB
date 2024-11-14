import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { RecompensaService } from '../../../services/recompensa.service';
import { MostClaimedRewardDTO } from '../../../models/MostClaimedRewardDTO';

Chart.register(...registerables);

@Component({
  selector: 'app-recompensasmasreclamadas',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './recompensasmasreclamadas.component.html',
  styleUrls: ['./recompensasmasreclamadas.component.css']
})
export class RecompensasmasreclamadasComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';  
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private rS: RecompensaService) {}

  ngOnInit(): void {
    this.rS.cantidadRecompensas().subscribe(
      (data: MostClaimedRewardDTO[]) => {
        this.barChartLabels = data.map(item => item.recompensa);
        this.barChartData = [
          {
            data: data.map(item => item.cantidadreclamos),
            label: 'Cantidad de recompensas reclamadas',
            backgroundColor: ['#e14625', '#ecad9e', '#de725c'],
            borderColor: '#ef3510',
            borderWidth: 1
          }
        ];
      },
    );
  }
  
}
