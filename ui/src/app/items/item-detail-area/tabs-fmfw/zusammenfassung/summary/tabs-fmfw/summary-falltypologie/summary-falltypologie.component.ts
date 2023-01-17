import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../../../services/items/incident";

@Component({
  selector: 'fmfw-summary-falltypologie',
  templateUrl: './summary-falltypologie.component.html',
  styleUrls: ['./summary-falltypologie.component.css']
})
export class SummaryFalltypologieComponent implements OnInit {

  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }

}
