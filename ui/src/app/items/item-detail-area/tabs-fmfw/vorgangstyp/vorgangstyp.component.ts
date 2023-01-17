import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../../../services/items/incident';
import {ItemsService} from '../../../services/items/items.service';
import {ConfigService} from "../../../../services/config/config.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-vorgangstyp',
  templateUrl: './vorgangstyp.component.html',
  styleUrls: ['./vorgangstyp.component.css']
})
export class VorgangstypComponent implements OnInit, OnDestroy {

  headingId = 'vorgangstyp';
  heading:string;
  public item: Item;

  constructor(
    private items: ItemsService,
    private config: ConfigService
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

}
