import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  symbols: any[] = [];
  private iexCloudAPI = 'https://cloud.iexapis.com/stable/ref-data/symbols?token=pk_95d416ed0acf41dfac0ae40e933acf8f';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchSymbols();
  }

  fetchSymbols(): void {
    this.httpClient.get<any[]>(this.iexCloudAPI).subscribe(data => {
      console.log(data);
      this.symbols = data;
    }, error => {
      console.error('Error fetching symbols:', error);
    });
  }
}
