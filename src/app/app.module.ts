import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';


import { InventoryTableComponent } from './tables/inventoryTable/inventoryTable.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoaderInterceptor } from './tables/services/loader/loader.interceptor';
import { LoaderComponent } from './tables/services/loader/loader.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MetricsComponent } from './charts/metrics/metrics.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { AdvancedPieChartComponent } from './charts/advanced-pie-chart/advanced-pie-chart.component';





@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    NgxSpinnerModule,
    NgxChartsModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonToggleModule

  ],
  providers: [
    {
       provide: HTTP_INTERCEPTORS,
       useClass: LoaderInterceptor,
       multi: true,
    },
 ],
 schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent, InventoryTableComponent, AboutComponent, NavbarComponent, SignInComponent, SignUpComponent, LoaderComponent, LandingComponent, HomeComponent, LineChartComponent, MetricsComponent, BarChartComponent, PieChartComponent, AdvancedPieChartComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
