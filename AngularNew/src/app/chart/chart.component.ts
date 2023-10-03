import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{

  @Input() symbol !: string;
  lineChart: any;
  chartData: any[] = [];
  chartLabels: any[] = [];
  private baseUrl = 'https://cloud.iexapis.com/stable/';
  private token = environment.apiToken;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchHistoricalData().subscribe(data => {
      this.chartData = data.map((day: any) => day.close);
      this.chartLabels = data.map((day: any) => day.date);
      this.initChart();
    });
  }

  fetchHistoricalData() {
    const url = `${this.baseUrl}stock/${this.symbol}/chart/1y?token=${this.token}`;
    return this.http.get<any>(url);
  }

  initChart() {
    this.lineChart = new Chart('lineCanvas', {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: this.symbol,
          data: this.chartData,
          borderColor: 'blue',
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
