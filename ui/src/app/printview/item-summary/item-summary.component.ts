import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from "../../items/services/items/incident";
import {ActivatedRoute} from "@angular/router";
import {ItemsService} from "../../items/services/items/items.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-item-summary',
  templateUrl: './item-summary.component.html',
  styleUrls: ['./item-summary.component.css']
})
export class ItemSummaryComponent implements OnInit, OnDestroy {

  content: string;
  id: string;
  item: Item;

  constructor(
    private route:ActivatedRoute,
    private itemService:ItemsService
  ) { }

  subscr: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.subscr = this.itemService.loadItem(+this.id)
        .subscribe((item: Item) => {
            this.item = new Item(item);
            console.log(`summary for item ${this.id} loaded`);
          },
          msg => {
            // TODO: itemService.loadItem - error handling!!
          });
    }
  }
}
