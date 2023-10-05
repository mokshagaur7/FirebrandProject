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
  apiUrl : string = 'http://localhost:5040/api/portfolio';

  constructor(private http:HttpClient,  private router: Router) { }

  ngOnInit(): void {
    this.http.get(this.apiUrl).subscribe(
      (data:any) => {
        this.portfolios = data;
      })
  }

  createPortfolio(): void {
    const newPortfolioData = {
      // Define the properties of the new portfolio here
      portfolioId: 12,
      userId: 1,
      stockId: 0,
      portfolioName: 'New Portfolio Name',
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
