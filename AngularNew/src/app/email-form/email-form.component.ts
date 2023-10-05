
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent{
    emailto: string | null =null;
    emailfrom: string | null =null;
    subject: string | null = null;
    message: string | null =null;

  apiUrl : string = 'http://localhost:5040/api/email';
  constructor(private router: Router,private http:HttpClient) {        
  }

    onsubmit(){
          const newSignupData = {
            emailto: this.emailto,
            emailfrom: this.emailfrom,
            subject: this.subject,
            message: this.message
            // Add other properties as needed in SignupRequest
          };
  
          this.http.post(this.apiUrl, newSignupData).subscribe(
            (response: any) => {
              console.log('Email sent', response);
            },
            (error: any) => {
              console.error('Email not sent:', error);
            }
          );
          this.router.navigate(['/']);
    }
  
      

}
  


