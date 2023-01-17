import {PathResolver} from "./path-resolver";

export class Evidence extends PathResolver {
  public title: string;   // UUID of user
  public place: string;

  constructor(values: any) {
    super();
    this.title = values.title ? values.title : undefined;
    this.place = values.place ? values.place : undefined;
  }
}
