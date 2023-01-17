import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../../../services/items/incident";
import {TEXTVIEW_FORMATS} from "../../../../../../../components/fmfw-textview/fmfw-textview.component";

@Component({
  selector: 'fmfw-summary-result',
  templateUrl: './summary-result.component.html',
  styleUrls: ['./summary-result.component.css']
})
export class SummaryResultComponent implements OnInit {

  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }

  public get TEXTVIEW_FORMATS(): any {
    return TEXTVIEW_FORMATS;
  }

}
