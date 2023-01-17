import {KeyValue} from "@angular/common";
import {ValueListItem} from "../../items/services/value-lists/value-list-item";

export class TimeOfDataDump implements ValueListItem {
  public id: string;
  public weight: number;
  public timestamp: string;
  public label: string;
  public key: string;
  public value: string;

  constructor(value: any)
  {
    this.id = value.id.toString();
    this.key = this.id;

    this.timestamp = value.timestamp;
    if (value.label) {
      this.label = value.label;
      this.value = this.label;
    } else {
      if (this.timestamp) {
        const date: Date = new Date(this.timestamp);
        this.label = date.toString();
        this.weight = date.getTime();
      }
    }
  }

}
