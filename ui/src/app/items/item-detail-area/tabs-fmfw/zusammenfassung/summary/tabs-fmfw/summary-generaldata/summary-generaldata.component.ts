import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../../../services/items/incident";
import {TEXTVIEW_FORMATS} from "../../../../../../../components/fmfw-textview/fmfw-textview.component";
import {ConfigService} from "../../../../../../../services/config/config.service";

@Component({
  selector: 'fmfw-summary-generaldata',
  templateUrl: './summary-generaldata.component.html',
  styleUrls: ['./summary-generaldata.component.css']
})
export class SummaryGeneraldataComponent implements OnInit {

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
