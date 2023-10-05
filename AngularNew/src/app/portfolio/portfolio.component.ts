import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit{
  portfolios : any[] = [];
  idsss : string | null = null;
  apiUrl : string = 'http://localhost:5040/api/portfolio';
  api: string = 'http://localhost:5040/api/id';
  portfolioName: string | null= null;

  constructor(private http:HttpClient,  private router: Router) { }

  ngOnInit(): void {
    this.http.get(this.apiUrl).subscribe(
      (data:any) => {
        this.portfolios = data;
      })
  }

  createPortfolio(): void {
    this.http.get(this.apiUrl).subscribe(
      (data:any) => {
        this.idsss = data;
      })
    const newPortfolioData = {
      userId: 9,
      stockId: 1,
      portfolioName: this.portfolioName,
    };
  
    this.http.post(this.apiUrl, newPortfolioData).subscribe(
        (response : any) => {
          console.log('Portfolio created:', response);
        },
        (error: any) => {
          console.error('Error creating portfolio:', error)
        }
    )
  }
  
  navigateToPortfolioStocks(portfolioId: number): void {
    // Navigate to the portfolio-stocks component with the portfolioId as a parameter
    console.log()
    this.router.navigate(['/portfolio-stocks', portfolioId]);
  }
}
