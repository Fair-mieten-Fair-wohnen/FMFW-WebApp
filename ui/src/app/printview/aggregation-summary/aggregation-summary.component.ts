import {Component, OnDestroy, OnInit} from '@angular/core';
import {TimeOfDataDump} from "../../aggregation/services/time-of-data-dump";
import {ActivatedRoute} from "@angular/router";
import {AGGREGATION_SCOPES, AggregationService} from "../../aggregation/services/aggregation.service";
import {ConfigService} from "../../services/config/config.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-aggregation-summary',
  templateUrl: './aggregation-summary.component.html',
  styleUrls: ['./aggregation-summary.component.css']
})
export class AggregationSummaryComponent implements OnInit, OnDestroy {

  aggScope: string;
  public aggScopeInternal: boolean;
  timeOfDataDump: string;
  public timeOfDataDumpObj: TimeOfDataDump;

  constructor(
    private route: ActivatedRoute,
    private aggregationService: AggregationService,
    private config: ConfigService
  ) { }

  subscr: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }
  ngOnInit() {
    this.aggScope = this.route.snapshot.paramMap.get('aggScope');
    this.aggScopeInternal = this.aggScope && this.aggScope === AGGREGATION_SCOPES.INTERNAL;
    this.timeOfDataDump = this.route.snapshot.paramMap.get('timeOfDataDump');
    if (this.timeOfDataDump) {
      this.subscr = this.aggregationService.getTimeOfDataDump(this.timeOfDataDump, this.aggScope).subscribe(obj => this.timeOfDataDumpObj = obj );
    }
  }

  get dateFormat(): string {
    return this.config.getString("DATE_FORMAT");
  }
}
