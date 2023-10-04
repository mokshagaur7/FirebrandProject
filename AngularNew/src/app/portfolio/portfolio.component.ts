import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit{
  portfolios: any[] = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:5040/api/portfolio').subscribe(
      (data:any) => {
        this.portfolios = data;
      })
  }

}
