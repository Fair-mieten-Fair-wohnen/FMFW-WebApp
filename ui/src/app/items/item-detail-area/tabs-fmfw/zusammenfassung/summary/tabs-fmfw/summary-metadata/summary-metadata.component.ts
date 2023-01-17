import {Component, Input} from '@angular/core';
import {Item} from "../../../../../../services/items/incident";
import {TEXTVIEW_FORMATS} from "../../../../../../../components/fmfw-textview/fmfw-textview.component";

@Component({
  selector: 'fmfw-summary-metadata',
  templateUrl: './summary-metadata.component.html',
  styleUrls: ['./summary-metadata.component.css']
})
export class SummaryMetadataComponent {

  @Input() item: Item;

  constructor(
  ) { }

  public get TEXTVIEW_FORMATS(): any {
    return TEXTVIEW_FORMATS;
  }
}
