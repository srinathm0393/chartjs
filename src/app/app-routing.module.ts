import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import {Chart1Component} from './chart1/chart1.component';

const routes: Routes = [
  {path: 'chartcomponent', component: ChartComponent},
  {path: 'chart1component', component: Chart1Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
