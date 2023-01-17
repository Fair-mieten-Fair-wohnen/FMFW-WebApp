import {Component, OnDestroy, OnInit} from '@angular/core';
import {ItemsService} from "../../services/items/items.service";
import {Observable, of, Subscription} from "rxjs";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit, OnDestroy {

  constructor(
    private items: ItemsService
  ) { }

  itemHasUnsavedChanges = false;

  canDeactivate(): Observable<boolean> | boolean {
    if (this.itemHasUnsavedChanges) {
      const confirmation = window.confirm('Es liegen Änderungen an Ihrem Vorgang vor, die noch nicht gespeichert wurden.\nWollen Sie Ihre Änderungen wirklich verwerfen?');

      return of(confirmation);
    }
    return true;
  }

  subscr: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }
  ngOnInit() {
    this.subscr = this.items.itemHasUnsavedChanges.subscribe(res => this.itemHasUnsavedChanges = res );
  }
}
