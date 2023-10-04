import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit{
  portfolios: any[] = [];
  selectedPortfolio: any;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:5040/api/portfolio').subscribe(
      (data:any) => {
        this.portfolios = data;
      })
  }

  addToPortfolio(): void {
    if (this.selectedPortfolio) {
      // Add your logic to handle adding the selected portfolio to the portfolio list
      console.log('Adding to portfolio:', this.selectedPortfolio);
    } else {
      console.log('Please select a portfolio.');
    }
  }

}
