import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { ListComponent } from './list/list.component';
import { SummaryComponent } from './summary/summary.component';
import { SignupComponent } from './signup/signup.component';
import { EmailFormComponent } from './email-form/email-form.component';


const routes: Routes = [{path:'',component:HomeComponent},
{path:'login',component:LoginComponent},
{path:'profile',component:ProfileComponent},
{path:'settings',component:SettingsComponent},
{path: 'summary/:symbol', component: SummaryComponent},
{path: 'signup', component:SignupComponent},
{path: 'email', component:EmailFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
