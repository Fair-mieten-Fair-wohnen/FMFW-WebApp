import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../../../services/items/incident";

@Component({
  selector: 'fmfw-summary-supporter',
  templateUrl: './summary-supporter.component.html',
  styleUrls: ['./summary-supporter.component.css']
})
export class SummarySupporterComponent implements OnInit {

  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }

}
