import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';
import { DataService } from '../data.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit{

  symbol !: string;
  priceData: any;
  tokenApi : string = environment.apiToken;

  newsData: any;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    const symbolFromRoute = this.route.snapshot.paramMap.get('symbol');
    if (symbolFromRoute) {
      this.symbol = symbolFromRoute;
      const priceData$ = this.dataService.fetchPriceData(this.symbol);
      const newsData$ = this.dataService.fetchNews(this.symbol);
  
      forkJoin([priceData$, newsData$]).subscribe(
        ([priceDataResponse, newsDataResponse]) => {
          this.priceData = priceDataResponse;
          this.newsData = newsDataResponse;
        },
        error => {
          console.error('There was an error fetching the data', error);
        }
      );
    } else {
       console.log("Symbol not found")
    }
  }

}
