import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  createUser:string|null=null;
  createPass:string|null=null;
  repeatPass:string|null=null;
  newEmail:string|null=null;

  constructor(private router: Router,private http:HttpClient) {        
  }

  navigate(){
    this.router.navigate(['/']);
  }

  onsubmit(){

  }
}









