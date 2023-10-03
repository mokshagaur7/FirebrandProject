import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsData: any;
  tokenApi: string = environment.apiToken;
  isLoading: boolean = true;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews(): void {
    const url = `https://cloud.iexapis.com/stable/stock/market/news/last/10?token=${this.tokenApi}`;
    this.httpClient.get(url).subscribe(data => {
      this.newsData = data;
      this.isLoading = false;
    }, error => {
      console.error("Error fetching news:", error);
      this.isLoading = false;
    });
  }
}
