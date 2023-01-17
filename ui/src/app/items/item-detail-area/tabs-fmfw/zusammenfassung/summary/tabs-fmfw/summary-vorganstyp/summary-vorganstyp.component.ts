import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../../../services/items/incident";

@Component({
  selector: 'fmfw-summary-vorganstyp',
  templateUrl: './summary-vorganstyp.component.html',
  styleUrls: ['./summary-vorganstyp.component.css']
})
export class SummaryVorganstypComponent {

  @Input() item: Item;

  constructor() { }

}
