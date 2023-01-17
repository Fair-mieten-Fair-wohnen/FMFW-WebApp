import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AggregationData} from "../../aggregation/services/aggregation-data";
import {AggregationService} from "../../aggregation/services/aggregation.service";
import {AggregationType} from "../../aggregation/services/aggregation-type";
import {Subscription} from "rxjs";

export const CHART_DATA_STATE = {
  NOT_ENOUGH_PARAMS: 0,
  LOADING_DATA: 1,
  DATA_LOADED: 2,
  ERROR: 100,
};

@Component({
  selector: 'fmfw-aggregation-chart',
  templateUrl: './fmfw-aggregation-chart.component.html',
  styleUrls: ['./fmfw-aggregation-chart.component.css']
})
export class FmfwAggregationChartComponent implements OnInit, OnDestroy {
  private _aggregationType: string;
  @Input()
  set aggregationType(val: string) {
    this._aggregationType = val;
    this.checkState();
  };

  private _timeOfDataDump: string;
  @Input()
  set timeOfDataDump(val: string) {
    this._timeOfDataDump = val;
    this.checkState();
  };

  @Input() printable: boolean = true;

  public chartDataState: number = CHART_DATA_STATE.NOT_ENOUGH_PARAMS;
  public chartData: AggregationData;
  public chartMetaData: AggregationType;

  constructor(
    private aggregationService: AggregationService
  ) { }

  subscr: Subscription;
  subscr2: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
    if (this.subscr2) {
      this.subscr2.unsubscribe();
    }
  }
  ngOnInit() {
  }

  private checkState() {
    if (!this._aggregationType || !this._timeOfDataDump) {
      this.chartData = undefined;
      this.chartDataState = CHART_DATA_STATE.NOT_ENOUGH_PARAMS;
    } else {

      this.chartDataState = CHART_DATA_STATE.LOADING_DATA;

      this.subscr = this.aggregationService.getAggregationType(this._aggregationType).subscribe(
        type =>
          this.chartMetaData = type);

      this.subscr2 = this.aggregationService.getAggregationData(
        this._aggregationType,
        this._timeOfDataDump).subscribe(
        data => {
          this.chartData = data;
          this.chartDataState = CHART_DATA_STATE.DATA_LOADED;
        },
        error => {
          this.chartDataState = CHART_DATA_STATE.ERROR;
        }
      )
    }
  }

  public get CHART_DATA_STATE(): any {
    return CHART_DATA_STATE;
  }
}
