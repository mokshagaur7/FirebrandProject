import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  newUser!:string ;

  constructor(private http:HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Access the portfolioId from the URL using ActivatedRoute
    this.route.params.subscribe(params => {
      this.newUser = params['newUser'];
    });
  }
}
