import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "../../../../services/config/config.service";
import {Item} from "../../../services/items/incident";
import {ItemsService} from "../../../services/items/items.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-zusammenfassung',
  templateUrl: './zusammenfassung.component.html',
  styleUrls: ['./zusammenfassung.component.css']
})
export class ZusammenfassungComponent implements OnInit, OnDestroy {

  item: Item;

  headingId = 'zusammenfassung';
  heading:string;
  constructor(
    private config: ConfigService,
    private items: ItemsService,
  ) { }

  subscr: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }
  ngOnInit() {
    this.heading = this.config.getTabLabelForId(this.headingId);
    this.subscr = this.items.getCurrentLoadedItem().subscribe(
      item => this.item = item
    );
  }

  public openPrintView() {
    window.open('/print/item/summary/'+this.item.id, '_printview');
  }
}
