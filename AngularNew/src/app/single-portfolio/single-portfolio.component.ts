import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-portfolio',
  templateUrl: './single-portfolio.component.html',
  styleUrls: ['./single-portfolio.component.css']
})
export class SinglePortfolioComponent implements OnInit{
  symbols: any[] = [];
  filteredSymbols: any[]=[];
  displayedItems: number = 15; // Initial number of items to display
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
      this.filteredSymbols = this.symbols.slice(0, this.displayedItems); // Display the first 15 items
      //this.symbols = this.filteredSymbols;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      console.error('Error fetching symbols:', error);
    });
  }
  loadMore(): void {
    this.displayedItems += 15; // Load the next 15 items
    this.filteredSymbols = this.symbols.slice(0, this.displayedItems);
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





  

  


  

 

  