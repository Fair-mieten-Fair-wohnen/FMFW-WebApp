import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../services/items/incident";
import {ItemsService} from "../../../../services/items/items.service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input() heading: string;

  item: Item;

  headingId = 'zusammenfassung';

  constructor(
    private items: ItemsService,
  ) {}

  ngOnInit() {

    this.items.getCurrentLoadedItem().toPromise().then(item => this.item = item);
  }

}
