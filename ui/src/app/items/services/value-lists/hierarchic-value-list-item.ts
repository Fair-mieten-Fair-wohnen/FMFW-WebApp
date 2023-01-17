import {ValueListItem} from "./value-list-item";

export class HierarchicValueListItem {
  public id: number;
  public key: string;
  public label: string;
  public weight?: number;
  public list?: ValueListItem[];
  public isFolder?: boolean;

}
