import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AggregationRoutingModule } from './aggregation-routing.module';
import { AggregationComponent } from './aggregation.component';
import { AggregationAreaComponent } from './aggregation-area/aggregation-area.component';
import { AggregationPrintAllComponent } from './aggregation-area/aggregation-print-all/aggregation-print-all.component';
import { AggregationSingleChartComponent } from './aggregation-area/aggregation-single-chart/aggregation-single-chart.component';
import {ComponentsModule} from "../components/components.module";
import {UtilsModule} from "../utils/utils.module";
import {ReactiveFormsModule} from "@angular/forms";
import { ListOfAggregatedChartsComponent } from './aggregation-area/aggregation-print-all/list-of-aggregated-charts/list-of-aggregated-charts.component';


@NgModule({
  declarations: [
    AggregationComponent,
    AggregationAreaComponent,
    AggregationPrintAllComponent,
    AggregationSingleChartComponent,
    ListOfAggregatedChartsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    UtilsModule,
    AggregationRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    ListOfAggregatedChartsComponent
  ]
})
export class AggregationModule { }
