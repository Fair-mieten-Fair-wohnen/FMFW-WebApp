export class Address {
  public street?: string;
  public number?: string;
  public city?: string;
  public zip?: string;

  constructor (values: any) {
    this.street = values.street ? values.street : undefined;
    this.number = values.number ? values.number : undefined;
    this.city = values.city ? values.city : undefined;
    this.zip = values.zip ? values.zip : undefined;
  }

  public toString = () : string => {
    // ignore number if no street is given
    const house = (this.street ? this.street : '') + (this.number ? ' ' + this.number : '');
    const city = (this.zip ? this.zip : '') + (this.city ? ' ' + this.city : '');
    return (house.length > 0) ? (house + (city.length > 0 ? (', ' + city) : '')) : (city.length > 0) ? city : '';
  }
}
