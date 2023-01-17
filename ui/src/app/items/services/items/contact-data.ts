import {Address} from "./address";
import {PathResolver} from "./path-resolver";

export class ContactData extends PathResolver {
  public address?: Address;
  public email?: string;
  public phone?: string;

  constructor(values: any) {
    super();
    if (values) {
      if (values.address) {
        this.address = new Address(values.address);
      }
      this.email = values.email;
      this.phone = values.phone;
    }
  }


  public isContactDataInserted(): boolean {
      if (this.phone || this.email) {
        return true;
      }
      if (this.address) {
        return this.address.street !== undefined || this.address.zip !== undefined || this.address.city !== undefined;
      }
      return false;
  }

  public addTo(param: any) {
    param.address = this.address;
    param.email = this.email;
    param.phone = this.phone;
  }

  public toFormString(): any {
    return {
      address: {
        street: this.address && this.address.street ? this.address.street : '',
          number: this.address && this.address.number ? this.address.number : '',
          city: this.address && this.address.city ? this.address.city : '',
          zip: this.address && this.address.zip ? this.address.zip : ''
      },
      email: this.email ? this.email : '',
        phone: this.phone ? this.phone : ''
    };

  }

}
