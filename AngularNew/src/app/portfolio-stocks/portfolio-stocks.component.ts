import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-portfolio-stocks',
  templateUrl: './portfolio-stocks.component.html',
  styleUrls: ['./portfolio-stocks.component.css']
})
export class PortfolioStocksComponent {
  portfolioStocks : any[] = [];
  apiUrl : string = 'http://localhost:5040/api/stock';

  constructor(private http:HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Access the portfolioId from the URL using ActivatedRoute
    this.route.params.subscribe(params => {
      const portfolioId = params['portfolioId'];
      
      // Update apiUrl to include the portfolioId as a query parameter
      this.apiUrl = `http://localhost:5040/api/stock?portfolioId=${portfolioId}`;

      // Fetch stocks for the specified portfolioId
      this.http.get(this.apiUrl).subscribe(
        (data: any) => {
          this.portfolioStocks = data;
          console.log(this.portfolioStocks);
        }
      );
    });
  }

}
