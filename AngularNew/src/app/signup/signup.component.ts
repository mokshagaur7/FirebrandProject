import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as crypto from "crypto-js";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username:string|null=null;
  password:string|null=null;
  repeatPass:string|null=null;
  newEmail:string|null=null;
  users: any[] = [];

  apiUrl : string = 'http://localhost:5040/api/signup';
  constructor(private router: Router,private http:HttpClient) {        
  }

  navigate(){
    this.router.navigate(['/']);
  }

  getinfo(){
    this.http.get(this.apiUrl).subscribe(
      (data:any) => {
        this.users = data;
      })
  }

  onsubmit(){
    const newSignupData = {
      Username: this.username,
      Password:  crypto.SHA256(this.password!).toString(),
      Email: this.newEmail
      // Add other properties as needed in SignupRequest
    };

    this.http.post(this.apiUrl, newSignupData).subscribe(
      (response: any) => {
        console.log('User registered:', response);
      },
      (error: any) => {
        console.error('Error registering user:', error);
      }
    );

    this.router.navigate(['/login']);
  }
}









