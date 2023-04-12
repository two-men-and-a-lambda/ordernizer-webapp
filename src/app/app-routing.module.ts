import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { InventoryTableComponent } from './tables/inventoryTable/inventoryTable.component';

const routes: Routes = [
    { path: '', component: InventoryTableComponent },
    { path: 'about', component: AboutComponent }
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
