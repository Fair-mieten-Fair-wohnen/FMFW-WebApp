export class ItemStub {
  public type: string;
  public id: string;
  public incident_number: string;
  public creation_date: string;
  public lastupdated_date: string;
  public institution: string;
  public consultant: string;
  public access_rights: string[];
  public totalItemsCount?: number;
  public responsible_institution?: string;
  public responsible_institution_others?: string;

  constructor(values: any) {
    this.type = values.type;
    this.id = values.id;
    this.incident_number = values.incident_number;
    this.creation_date = values.creation_date;
    this.lastupdated_date = values.lastupdated_date ? values.lastupdated_date : this.creation_date;
    this.institution = values.institution;
    this.consultant = values.consultant;
    this.access_rights = values.access_rights;
    this.totalItemsCount = values.totalItemsCount;
    this.responsible_institution = values.responsible_institution;
    this.responsible_institution_others = values.responsible_institution_others;
  }
}
