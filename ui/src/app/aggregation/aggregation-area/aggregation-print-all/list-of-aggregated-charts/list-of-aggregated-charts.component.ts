import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AggregationType} from "../../../services/aggregation-type";
import {AggregationService} from "../../../services/aggregation.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'fmfw-list-of-aggregated-charts',
  templateUrl: './list-of-aggregated-charts.component.html',
  styleUrls: ['./list-of-aggregated-charts.component.css']
})
export class ListOfAggregatedChartsComponent implements OnInit, OnDestroy {

  @Input() timeOfDataDump: string;
  @Input() printable: boolean = true;

  allAggregationTypes: AggregationType[];

  constructor(
    private aggregationService: AggregationService,
  ) { }

  subscr: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }
  ngOnInit() {
    this.subscr = this.aggregationService.getAllAggregationTypes().subscribe(types => this.allAggregationTypes = types);
  }

}
