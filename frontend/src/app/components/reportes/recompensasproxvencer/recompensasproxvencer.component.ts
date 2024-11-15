import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { RecompensaService } from '../../../services/recompensa.service';
import { CloseToExpireDTO } from '../../../models/CloseToExpireDTO';

Chart.register(...registerables);

@Component({
  selector: 'app-recompensasproxvencer',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './recompensasproxvencer.component.html',
  styleUrl: './recompensasproxvencer.component.css'
})
export class RecompensasproxvencerComponent implements OnInit {
  lineChartOptions: ChartOptions = {
    responsive: true,
  };
  lineChartLabels: string[] = [];
  lineChartType: ChartType = 'line';
  lineChartLegend = true;
  lineChartData: ChartDataset[] = [];
  constructor(private rS: RecompensaService) {}

  ngOnInit(): void {
    this.rS.proximoVencimiento().subscribe((data: CloseToExpireDTO[]) => {
      const currentDate = new Date();
  
      this.lineChartLabels = data.map(item => item.recompensa);
      this.lineChartData = [
        {
          data: data.map(item => {
            const fechaVencimiento = new Date(item.proximovencer);
            // Calcular la diferencia de días entre la fecha actual y la fecha de vencimiento
            const diffDays = Math.ceil((fechaVencimiento.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
            return diffDays;
          }),
          label: 'Días hasta el vencimiento',
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          fill: false
        }
      ];
    });
  }
  
}