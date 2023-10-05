import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users: any[] = [];

  apiUrl : string = 'http://localhost:5040/api/login';
  token: undefined;
  constructor(private router: Router,private http:HttpClient) {      
    this.token = undefined;  
  }

  ngOnInit(): void {
    this.http.get(this.apiUrl).subscribe(
      (data:any) => {
        this.users = data;
        console.log(this.users);
      })
  }

  

  

}
