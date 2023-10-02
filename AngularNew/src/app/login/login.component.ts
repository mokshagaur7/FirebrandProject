import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  newUser:string|null=null;
  newPass:string|null=null;

  constructor(private router: Router) {        
  }

  navigate(){
    this.router.navigate(['/home']);
  }

}
