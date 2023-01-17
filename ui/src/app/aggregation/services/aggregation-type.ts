import {KeyValue} from "@angular/common";
import {ValueListItem} from "../../items/services/value-lists/value-list-item";

export class AggregationType implements ValueListItem {
  public id: string;
  public weight: number;
  public title: string;
  public subtitle: string;
  public description: string;
  public complexity: string;

  public key: string;
  public label: string;

  constructor(value: any)
  {
    this.id = value.id;
    this.key = this.id;

    this.weight = value.order;
    this.title = value.title;
    this.subtitle = value.subtitle;
    this.description = value.description;
    this.complexity = value.complexity;

    this.label = this.title;
  }
}
