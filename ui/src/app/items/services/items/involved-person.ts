import {Address} from "./address";
import {PathResolver} from "./path-resolver";

export class InvolvedPerson extends PathResolver {
  public name?: string;
  public address?: Address;
  public email?: string;
  public phone?: string;
  public note?: string;

  constructor( values: any ){
    super();
    this.name = values.name;
    this.address = values.address ? new Address(values.address) : undefined;
    this.email = values.email;
    this.phone = values.phone;
    this.note = values.note;
  }
}
