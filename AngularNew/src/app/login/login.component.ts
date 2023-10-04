import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RecaptchaComponent } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  newUser:string|null=null;
  newPass:string|null=null;
  token: string|undefined;

  constructor(private router: Router) {      
    this.token = undefined;  
  }

  navigate(form: NgForm){
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    console.debug(`Token [${this.token}] generated`);
    this.router.navigate(['/']);
  }

  toSingup(){
    this.router.navigate(['/signup']);
  }




}
