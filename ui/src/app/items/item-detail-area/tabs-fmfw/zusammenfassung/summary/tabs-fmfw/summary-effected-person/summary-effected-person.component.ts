import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../../../services/items/incident";

@Component({
  selector: 'fmfw-summary-effected-person',
  templateUrl: './summary-effected-person.component.html',
  styleUrls: ['./summary-effected-person.component.css']
})
export class SummaryEffectedPersonComponent implements OnInit {

  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }

}
