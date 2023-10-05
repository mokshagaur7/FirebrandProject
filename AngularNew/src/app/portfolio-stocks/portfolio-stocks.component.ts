import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-portfolio-stocks',
  templateUrl: './portfolio-stocks.component.html',
  styleUrls: ['./portfolio-stocks.component.css']
})
export class PortfolioStocksComponent {
  portfolioStocks : any[] = [];
  apiUrl : string = 'http://localhost:5040/api/stock';

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.apiUrl).subscribe(
      (data:any) => {
        this.portfolioStocks = data;
        console.log(this.portfolioStocks);
      })
  }

}
