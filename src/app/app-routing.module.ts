import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { InventoryTableComponent } from './tables/inventoryTable/inventoryTable.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';


const routes: Routes = [
    { path: '', component: InventoryTableComponent },
    { path: 'home', component: InventoryTableComponent },
    { path: 'about', component: AboutComponent },
  { path: 'login', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  
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
