import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AggregationComponent} from "./aggregation.component";
import {AggregationAreaComponent} from "./aggregation-area/aggregation-area.component";
import {AuthGuard} from "../auth/auth.guard";
import {AggregationSingleChartComponent} from "./aggregation-area/aggregation-single-chart/aggregation-single-chart.component";
import {AggregationPrintAllComponent} from "./aggregation-area/aggregation-print-all/aggregation-print-all.component";

export const aggregationRoutes: Routes = [
  {
    path: "aggregation",
    canActivate: [AuthGuard],
    data: {
      roles_required: ["aggregation-access"]
    },
    component: AggregationComponent,
    children: [
      {
        path: "",
        data: {
          active_area: 'AGGREGATION',
          active_tabs: 'AGGREGATION'
        },
        component: AggregationAreaComponent,
        children: [
          {
            path: "single-chart",
            component: AggregationSingleChartComponent
          },
          {
            path: "print-all",
            component: AggregationPrintAllComponent
          },
          {
            path: '',
            redirectTo: "single-chart",
            pathMatch: 'full'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(aggregationRoutes)],
  exports: [RouterModule]
})
export class AggregationRoutingModule { }
