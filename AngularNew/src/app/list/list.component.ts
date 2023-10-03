import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  //listComponent: Location[] = [];
  symbols: any[] = [];
  filteredSymbols: any[]=[];
  isLoading: boolean = true;
  
  tokenApi: string = environment.apiToken;
  private iexCloudAPI = `https://cloud.iexapis.com/stable/ref-data/symbols?token=${this.tokenApi}`;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchSymbols();

    
  }

  fetchSymbols(): void {
    this.httpClient.get<any[]>(this.iexCloudAPI).subscribe(data => {
      console.log(data);
      this.symbols = data;
      this.symbols = data.map(symbol => ({ ...symbol, selected: false }));
      this.filteredSymbols = data;
      //this.symbols = this.filteredSymbols;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      console.error('Error fetching symbols:', error);
    });
  }

 

  filterResults(text: string): void {
    if (!text) {
      this.filteredSymbols = this.symbols; // Reset to all symbols when the search text is empty
      return;
    }

    const regex = new RegExp(text, 'i'); // 'i' flag for case-insensitive matching
    this.filteredSymbols = this.symbols.filter(symbol => regex.test(symbol.symbol) || regex.test(symbol.name));
  }

  handleSearchInputChange(text: string): void {
    if (!text) {
      this.filteredSymbols = this.symbols; // Return the complete list when the search text is empty
    }
  }

}
