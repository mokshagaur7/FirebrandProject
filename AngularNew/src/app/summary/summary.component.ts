import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  public lineChartData: { data: number[], label: string }[] = [
    { data: [], label: 'IBM' }
  ];
  public lineChartLabels: string[] = [];
  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public lineChartType = 'line';

  private url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get<any>(this.url).subscribe(response => {
      const timeSeries = response['Time Series (Daily)'];

      for (const date in timeSeries) {
        if (timeSeries.hasOwnProperty(date)) {
          this.lineChartLabels.push(date);
          this.lineChartData[0].data.push(+timeSeries[date]['1. open']); // Or use other data points like '2. high'
        }
      }
    });
  }
}
