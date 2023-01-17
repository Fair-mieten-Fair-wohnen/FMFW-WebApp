import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "../../../services/config/config.service";
import {TimeOfDataDump} from "../../services/time-of-data-dump";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AGGREGATION_SCOPES, AggregationService} from "../../services/aggregation.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-aggregation-print-all',
  templateUrl: './aggregation-print-all.component.html',
  styleUrls: ['./aggregation-print-all.component.css']
})
export class AggregationPrintAllComponent implements OnInit, OnDestroy {

  headingId = 'aggregation_print_all';
  heading:string;

  allTimesOfDataDumps: TimeOfDataDump[];

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
  }

  ngOnInit() {
    this.heading = this.config.getTabLabelForId(this.headingId);

    this.aggregationSelectionForm = this.fb.group({
      timeOfDataDump: [''],
      aggregationScope: ['']
    });

    // get aggregationScope
    const isInternal = this.aggregationService.getStoredData("printAll_aggregationScope", false);
    this.reloadTimestamps(isInternal);

    // initialize form with recently selected values
    this.aggregationSelectionForm.setValue(
      {
        timeOfDataDump: this.aggregationService.getStoredData("printAll_timeOfDataDump", ''),
        aggregationScope: isInternal
      }
    );
    this.checkIfChartDataSelected();

    this.onChanges();

  }

  private onChanges() {
    this.subscr2 = this.aggregationSelectionForm.get('timeOfDataDump').valueChanges.subscribe(val => {
        this.aggregationService.setStoredData("printAll_timeOfDataDump", val);
        this.checkIfChartDataSelected();
      }
    );
    this.subscr3 = this.aggregationSelectionForm.get('aggregationScope').valueChanges.subscribe(val => {
        this.aggregationService.setStoredData("printAll_aggregationScope", val);
        this.reloadTimestamps(val);
        this.aggregationSelectionForm.patchValue({timeOfDataDump: ''});
      }
    );
  }

  private checkIfChartDataSelected() {
    this.chartDataSelected = !!this.timeOfDataDump;
  }

  public openPrintView() {
    const aggScope = this.aggregationScope ? AGGREGATION_SCOPES.INTERNAL : AGGREGATION_SCOPES.ALL;
    window.open(`/print/aggregation/${this.timeOfDataDump}/${aggScope}`, '_printview');
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

  public get aggregationScope(): string {
    return this.aggregationSelectionForm.get("aggregationScope").value;
  }
}
