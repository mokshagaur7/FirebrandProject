import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit{
  portfolios : any[] = [];
  apiUrl : string = 'http://localhost:5040/api/portfolio';

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.apiUrl).subscribe(
      (data:any) => {
        this.portfolios = data;
      })
  }

  createPortfolio(): void {
    const newPortfolioData = {
      // Define the properties of the new portfolio here
      id: 12345,
      name: 'New Portfolio Name',
      stockIds: {} // Example: Replace with the actual name
      // Add any other properties your C# back-end expects
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
}
