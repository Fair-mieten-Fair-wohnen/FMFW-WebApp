import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FmfwSelectboxComponent } from './fmfw-selectbox/fmfw-selectbox.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FmfwSelectboxWithOthersComponent } from './fmfw-selectbox-with-others/fmfw-selectbox-with-others.component';
import { FmfwSelectboxContentTextviewComponent } from './fmfw-selectbox-content-textview/fmfw-selectbox-content-textview.component';
import { FmfwSummaryHeaderComponent } from './fmfw-summary-header/fmfw-summary-header.component';
import { FmfwTextviewComponent } from './fmfw-textview/fmfw-textview.component';
import { FmfwContactSummaryTextviewComponent } from './fmfw-contact-summary-textview/fmfw-contact-summary-textview.component';
import { FmfwDiscriminationTreeReadonlyComponent } from './fmfw-discrimination-tree-readonly/fmfw-discrimination-tree-readonly.component';
import {TreeModule} from "angular-tree-component";
import { FmfwContactInputComponent } from './fmfw-contact-input/fmfw-contact-input.component';
import { FmfwCheckboxSelectWithOthersComponent } from './fmfw-checkbox-select-with-others/fmfw-checkbox-select-with-others.component';
import { FmfwCheckboxSelectComponent } from './fmfw-checkbox-select/fmfw-checkbox-select.component';
import { FmfwDateSelectComponent } from './fmfw-date-select/fmfw-date-select.component';
import {BsDatepickerModule, TimepickerModule} from "ngx-bootstrap";
import { FMFWContactListViewComponent } from './fmfw-contact-list-view/fmfw-contact-list-view.component';
import { FmfwDetailsSideNavComponent } from './fmfw-details-side-nav/fmfw-details-side-nav.component';
import {RouterModule} from "@angular/router";
import { FmfwAggregationChartComponent } from './fmfw-aggregation-chart/fmfw-aggregation-chart.component';
import {ChartComponent} from "./fmfw-aggregation-chart/chart/chart.component";



@NgModule({
  declarations: [
    FmfwSelectboxComponent,
    FmfwSelectboxWithOthersComponent,
    FmfwSelectboxContentTextviewComponent,
    FmfwSummaryHeaderComponent,
    FmfwTextviewComponent,
    FmfwContactSummaryTextviewComponent,
    FmfwDiscriminationTreeReadonlyComponent,
    FmfwContactInputComponent,
    FmfwCheckboxSelectWithOthersComponent,
    FmfwCheckboxSelectComponent,
    FmfwDateSelectComponent,
    FMFWContactListViewComponent,
    FmfwDetailsSideNavComponent,
    FmfwAggregationChartComponent,
    ChartComponent,
  ],
  exports: [
    FmfwSelectboxComponent,
    FmfwSelectboxWithOthersComponent,
    FmfwSelectboxContentTextviewComponent,
    FmfwSummaryHeaderComponent,
    FmfwTextviewComponent,
    FmfwContactSummaryTextviewComponent,
    FmfwDiscriminationTreeReadonlyComponent,
    FmfwContactInputComponent,
    FmfwCheckboxSelectComponent,
    FmfwCheckboxSelectWithOthersComponent,
    FmfwDateSelectComponent,
    FMFWContactListViewComponent,
    FmfwDetailsSideNavComponent,
    FmfwAggregationChartComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(), TimepickerModule.forRoot(),
    TreeModule.forRoot()
  ]
})
export class ComponentsModule { }
