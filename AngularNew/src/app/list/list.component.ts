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
  displayedItems: number = 15; // Initial number of items to display
  isLoading: boolean = true;
  // Create an array to store selected stocks
  selectedStocks: any[] = [];
  showPortfolioDropdown: boolean = false;


  // Data for add button
  portfolios: any[] = []; // Array to store user's portfolios
  selectedPortfolioId: number | null = null; // Variable to store the selected portfolio ID

  
  tokenApi: string = environment.apiToken;
  private iexCloudAPI = `https://cloud.iexapis.com/stable/ref-data/symbols?token=${this.tokenApi}`;
  apiUrl : string = 'http://localhost:5040/api/stock';
  portfolioApiUrl : string = 'http://localhost:5040/api/portfolio';

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

  addToPortfolio(): void {
    

    // Fetch user's portfolios from your backend
    this.httpClient.get<any[]>(this.portfolioApiUrl).subscribe(data => {
      this.portfolios = data;
    });

    // When the "Add to Portfolio" button is clicked, toggle the showPortfolioDropdown property
    this.showPortfolioDropdown = !this.showPortfolioDropdown;

    // Filter the selected stocks
    this.selectedStocks = this.symbols.filter(symbol => symbol.selected);

    if (this.selectedStocks.length === 0) {
      // Show a message or handle the case when no stocks are selected
      console.log('No stocks selected to add to the portfolio.');
      return;
    }

    if (this.selectedPortfolioId !== null) {

      this.selectedStocks.forEach((selectedStock) => {
        const newPortfolioStockData = {
          // Define the properties of the new stock here
          symbol: selectedStock.symbol,
          name: selectedStock.name,
          portfolioId: this.selectedPortfolioId, //TODO: change to get portfolio ID to add the stock to
        };

        this.httpClient.post<any>(this.apiUrl, newPortfolioStockData)
        .subscribe(
          response => {
            console.log('Stocks added to the portfolio:', response);
            // You can also update the UI or perform any other actions here as needed.
          },
          error => {
            console.error('Error adding stocks to the portfolio:', error);
          }
        );

      });
    }
  }

}
