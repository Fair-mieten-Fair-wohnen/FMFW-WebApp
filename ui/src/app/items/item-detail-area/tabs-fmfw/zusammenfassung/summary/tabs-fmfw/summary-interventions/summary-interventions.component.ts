import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../../../services/items/incident";
import {TEXTVIEW_FORMATS} from "../../../../../../../components/fmfw-textview/fmfw-textview.component";
import {ConfigService} from "../../../../../../../services/config/config.service";

@Component({
  selector: 'fmfw-summary-interventions',
  templateUrl: './summary-interventions.component.html',
  styleUrls: ['./summary-interventions.component.css']
})
export class SummaryInterventionsComponent implements OnInit {

  dateFormat = 'dd.MM.yyyy';

  @Input() item: Item;

  constructor(
    private config: ConfigService
  ) { }

  ngOnInit() {
    this.dateFormat = this.config.getString('DATE_FORMAT');
  }

  public get TEXTVIEW_FORMATS(): any {
    return TEXTVIEW_FORMATS;
  }
}
