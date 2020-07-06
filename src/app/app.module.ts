import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { Chart1Component } from './chart1/chart1.component';
import { HttpClientModule } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
  { path: 'chartcomponent', component: ChartComponent},
  { path: 'chart1component', component: Chart1Component},
];

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
