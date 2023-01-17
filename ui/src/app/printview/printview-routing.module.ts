import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrintviewComponent} from "./printview/printview.component";
import {ItemSummaryComponent} from "./item-summary/item-summary.component";
import {AggregationSummaryComponent} from "./aggregation-summary/aggregation-summary.component";


const printRoutes: Routes = [
  {
    path: 'print',
    component: PrintviewComponent,
    children: [
      {
        path: 'item/summary/:id',
        component: ItemSummaryComponent
      },
      {
        path: 'aggregation/:timeOfDataDump/:aggScope',
        component: AggregationSummaryComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(printRoutes)],
  exports: [RouterModule]
})
export class PrintviewRoutingModule { }
