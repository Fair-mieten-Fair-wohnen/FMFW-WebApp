import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../../../services/items/incident";

@Component({
  selector: 'fmfw-summary-evidence',
  templateUrl: './summary-evidence.component.html',
  styleUrls: ['./summary-evidence.component.css']
})
export class SummaryEvidenceComponent implements OnInit {

  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }

}
