import {Address} from "./address";
import {PathResolver} from "./path-resolver";

export class Supporter extends PathResolver {
  public support_format: string;
  public support_format_others: string;
  public institution_name: string;
  public supporter_name: string;
  public address?: Address;
  public email: string;
  public phone: string;

  constructor (values: any) {
    super();
    this.support_format = values.support_format;
    this.support_format_others = values.support_format_others;
    this.institution_name = values.institution_name;
    this.supporter_name = values.supporter_name;
    this.address = values.address ? new Address(values.address) : undefined;
    this.email = values.email;
    this.phone = values.phone;
  }
}

