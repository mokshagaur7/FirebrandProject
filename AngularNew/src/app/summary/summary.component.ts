import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit{
  symbol !: string;
  priceData: any;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
    const symbolFromRoute = this.route.snapshot.paramMap.get('symbol');
    if (symbolFromRoute) {
      this.symbol = symbolFromRoute;
      this.fetchPriceData();
    } else {
       console.log("Symbol not found")
    }
  }

  fetchPriceData(): void {
    const apiUrl = `https://cloud.iexapis.com/stable/stock/${this.symbol}/quote?token=pk_95d416ed0acf41dfac0ae40e933acf8f`;
    this.httpClient.get(apiUrl).subscribe(data => {
      this.priceData = data;
    });
  }
}
