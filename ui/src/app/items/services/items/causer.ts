import {Address} from "./address";
import * as uuid from 'uuid';
import {PathResolver} from "./path-resolver";

export class Causer extends PathResolver {
  public id?: string;
  public company_institution_name?: string;
  public causer_name?: string;
  public address?: Address;
  public email?: string;
  public phone?: string;

  constructor(
    values: any
  ){
    super();
    this.id = values.id ? values.id : uuid.v4();
    this.company_institution_name = values.company_institution_name;
    this.causer_name = values.causer_name;
    this.address = values.address ? new Address(values.address) : undefined;
    this.email = values.email;
    this.phone = values.phone;
  }
}

