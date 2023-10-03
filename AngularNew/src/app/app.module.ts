import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { RECAPTCHA_SETTINGS,RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { RecaptchaComponent } from './recaptcha/recaptcha.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    SettingsComponent,
    HomeComponent,
    ListComponent,
    NavbarComponent,
    SignupComponent,
    RecaptchaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RecaptchaFormsModule,
    RecaptchaModule
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: "6LcdO3EoAAAAADihO344u2Z79OPc9yKXaq0y7F2F",
    } as RecaptchaSettings},],
  bootstrap: [AppComponent]
})
export class AppModule { }
