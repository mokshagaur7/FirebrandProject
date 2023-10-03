import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'https://cloud.iexapis.com/'; // replace with the actual base URL of your API
  private token = environment.apiToken; // If using an environment token

  constructor(private http: HttpClient) { }

  fetchPriceData(symbol: string): Observable<any> {
    const url = `${this.baseUrl}stable/stock/${symbol}/quote?token=${this.token}`; // Replace 'yourEndpointHere' with your actual endpoint
    return this.http.get<any>(url);
  }

  // Add other data-related methods as needed
}
