import { Component, OnInit } from '@angular/core';
import {ItemsService} from '../../services/items/items.service';
import {Item} from '../../services/items/incident';

@Component({
  selector: 'app-item-new',
  templateUrl: './item-new.component.html',
  styleUrls: ['./item-new.component.css']
})
export class ItemNewComponent implements OnInit {

  public item: Item;

  constructor(
    private itemService: ItemsService
  ) { }

  ngOnInit() {
    this.item = this.itemService.unloadItem();
  }

}
