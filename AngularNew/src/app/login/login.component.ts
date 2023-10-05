import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RecaptchaComponent } from 'ng-recaptcha';
import * as crypto from "crypto-js";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  newUser:string|null=null;
  newPass:string|null=null;
  token: string|undefined;
  users: any[] = [];
  message: string|null=null;

  apiUrl : string = 'http://localhost:5040/api/login';
  constructor(private router: Router,private http:HttpClient) {      
    this.token = undefined;  
  }

  ngOnInit(): void {
    this.http.get(this.apiUrl).subscribe(
      (data:any) => {
        this.users = data;
      })
  }

  navigate(form: NgForm){
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }
    if((this.users.some(e => e.username === this.newUser)) && (this.users.some(e => e.password === crypto.SHA256(this.newPass!).toString()))){
      
      console.debug(`Token [${this.token}] generated`);
      this.router.navigate(['/']);
    }
    else{
      this.message = "The user or password are wrong!";
    }
  }

  toSingup(){
    this.router.navigate(['/signup']);
  }




}
