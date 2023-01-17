import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../../../services/items/incident";
import {TEXTVIEW_FORMATS} from "../../../../../../../components/fmfw-textview/fmfw-textview.component";
import {ConfigService} from "../../../../../../../services/config/config.service";

@Component({
  selector: 'fmfw-summary-short-incident-description',
  templateUrl: './summary-short-incident-description.component.html',
  styleUrls: ['./summary-short-incident-description.component.css']
})
export class SummaryShortIncidentDescriptionComponent implements OnInit {

  dateFormat = 'dd.MM.yyyy';
  timeFormat = 'HH:mm';

  @Input() item: Item;

  constructor(
    private config: ConfigService
  ) {
  }

  public get TEXTVIEW_FORMATS(): any {
    return TEXTVIEW_FORMATS;
  }

  ngOnInit() {
    this.dateFormat = this.config.getString('DATE_FORMAT');
    this.timeFormat = this.config.getString('TIME_FORMAT');
  }
}
