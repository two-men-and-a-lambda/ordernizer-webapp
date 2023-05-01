import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthGuard } from './auth/auth-guard.guard';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { DashComponent } from './dash/dash.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'login', component: SignInComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: SignUpComponent, canActivate: [AuthGuard]   },
  { path: 'metrics', component: DashComponent, canActivate: [AuthGuard]   },



];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
