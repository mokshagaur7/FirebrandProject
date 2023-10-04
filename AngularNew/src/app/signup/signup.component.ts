import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  apiUrl : string = 'http://localhost:5040/api/signup';
  constructor(private router: Router,private http:HttpClient) {        
  }

  navigate(){
    this.router.navigate(['/']);
  }

  onsubmit(){
    const newSignupData = {
      username: "hello",
      password: "password",
      email: "email"
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
  }
}









