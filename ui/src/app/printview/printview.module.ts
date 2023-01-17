import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintviewRoutingModule } from './printview-routing.module';
import { PrintviewComponent } from './printview/printview.component';
import { ItemSummaryComponent } from './item-summary/item-summary.component';
import {ItemsModule} from "../items/items.module";
import { AggregationSummaryComponent } from './aggregation-summary/aggregation-summary.component';
import {AggregationModule} from "../aggregation/aggregation.module";


@NgModule({
  declarations: [PrintviewComponent, ItemSummaryComponent, AggregationSummaryComponent],
  imports: [
    CommonModule,
    ItemsModule,
    AggregationModule,
    PrintviewRoutingModule
  ]
})
export class PrintviewModule { }
