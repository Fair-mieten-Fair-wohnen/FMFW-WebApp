export class CauserType {
  public causer_type: string;         // key of the type of causer
  public causer_id?: string;           // uuid of the causer this type belongs to
  public causer_type_others?: string; // string of the other type; only set with causer_type = others selected
  public owner_agency?: string;       // kind of apartment structure; only set with causer_type = owner or agency
  public owner_agency_others?: string;
  public number_of_appartments?: string;  // number of apartments; only set with causer_type = owner or agency
  public number_of_appartments_others?: string;

  constructor(values: any, causer_id?: string) {
    if (values) {
      this.causer_id = values.causer_id || causer_id;
      this.assignDataWithOthers(values, "causer_type");
      this.assignDataWithOthers(values, "owner_agency");
      this.assignDataWithOthers(values, "number_of_appartments");
    }
  }

  /**
   * two variants of data structure:
   * from item:
         public causer_type: string;         // key of the type of causer
         public causer_type_others?: string; // string of the other type; only set with causer_type = others selected
   * from reactiveFormGroup:
         public causer_type: {
            selected: string,
            others: string
         }
   *
   */
  private assignDataWithOthers(values: any, dataName: string) {
    const value = values[dataName];
    if (value) {
      if (typeof value === "string") {
        this[dataName] = value;
        const value_others = values[dataName + "_others"];
        this[dataName + "_others"] = value_others;
      } else {
        if (value.selected) {
          this[dataName] = value.selected;
          this[dataName + "_others"] = value.others;
        }
      }
    }
  }

  public isDataInserted(): boolean {
    if (this.causer_type) {
      return true;
    }
    return false;
  }

  public toString(): string {
    return "";
  }
}
