import {ItemInterface} from './item-interface';

export class Item {
  constructor (
    public type: string,
    public id?: number,
    public name?: string,
    public ref_id?: string,
    public time_range?: string,
    public owner?: string,
    public creation_date?: string,
    public state?: string
  ) {}

  static fromJSON(json: ItemInterface): Item {
    const item = Object.create(Item.prototype);
    return Object.assign(item, json);
  }

}
