import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "../../../services/config/config.service";
import {TimeOfDataDump} from "../../services/time-of-data-dump";
import {AggregationType} from "../../services/aggregation-type";
import {AGGREGATION_SCOPES, AggregationService} from "../../services/aggregation.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-aggregation-single-chart',
  templateUrl: './aggregation-single-chart.component.html',
  styleUrls: ['./aggregation-single-chart.component.css']
})
export class AggregationSingleChartComponent implements OnInit, OnDestroy {

  headingId = 'aggregation_single_chart';
  heading:string;

  allTimesOfDataDumps: TimeOfDataDump[];
  allAggregationTypes: AggregationType[];

  chartDataSelected: boolean = false;

  aggregationSelectionForm: FormGroup;

  constructor(
    private config: ConfigService,
    private aggregationService: AggregationService,
    private fb: FormBuilder,
  ) { }

  subscr: Subscription;
  subscr2: Subscription;
  subscr3: Subscription;
  subscr4: Subscription;
  subscr5: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
    if (this.subscr2) {
      this.subscr2.unsubscribe();
    }
    if (this.subscr3) {
      this.subscr3.unsubscribe();
    }
    if (this.subscr4) {
      this.subscr4.unsubscribe();
    }
    if (this.subscr5) {
      this.subscr5.unsubscribe();
    }
  }
  ngOnInit() {
    this.heading = this.config.getTabLabelForId(this.headingId);

    this.aggregationSelectionForm = this.fb.group({
      aggregationType: [''],
      timeOfDataDump: [''],
      aggregationScope: ['']
    });

    // get aggregationScope
    const isInternal = this.aggregationService.getStoredData("singleChart_aggregationScope", false);
    this.reloadTimestamps(isInternal);

    this.subscr = this.aggregationService.getAllAggregationTypes().subscribe(
      types =>
        this.allAggregationTypes = types);

    // initialize form with recently selected values
    this.aggregationSelectionForm.setValue(
      {
        aggregationType: this.aggregationService.getStoredData("singleChart_aggregationType", ''),
        timeOfDataDump: this.aggregationService.getStoredData("singleChart_timeOfDataDump", ''),
        aggregationScope: isInternal
      }
    );
    this.checkIfChartDataSelected();

    this.onChanges();
  }

  private onChanges() {
    this.subscr3 = this.aggregationSelectionForm.get('timeOfDataDump').valueChanges.subscribe(val => {
        this.aggregationService.setStoredData("singleChart_timeOfDataDump", val);
        this.checkIfChartDataSelected();
      }
    );
    this.subscr4 = this.aggregationSelectionForm.get('aggregationType').valueChanges.subscribe(val => {
        this.aggregationService.setStoredData("singleChart_aggregationType", val);
        this.checkIfChartDataSelected();
      }
    );
    this.subscr5 = this.aggregationSelectionForm.get('aggregationScope').valueChanges.subscribe(val => {
        this.aggregationService.setStoredData("singleChart_aggregationScope", val);
        this.reloadTimestamps(val);
        this.aggregationSelectionForm.patchValue({timeOfDataDump: ''});
      }
    );
  }

  private checkIfChartDataSelected() {
    this.chartDataSelected = !!(this.timeOfDataDump && this.aggregationType);
  }

  private reloadTimestamps(isInternal: boolean) {
    const aggScope = isInternal ? AGGREGATION_SCOPES.INTERNAL : AGGREGATION_SCOPES.ALL;
    if (this.subscr2) {
      this.subscr2.unsubscribe();
    }
    this.subscr2 = this.aggregationService.getAllTimesOfDataDumps(aggScope).subscribe(
      times =>
        this.allTimesOfDataDumps = times);
  }

  public get timeOfDataDump(): string {
    return this.aggregationSelectionForm.get("timeOfDataDump").value;
  }

  public get aggregationType(): string {
    return this.aggregationSelectionForm.get("aggregationType").value;
  }

}
