import {PathResolver} from "./path-resolver";

export class Intervention extends PathResolver {
  public date?: string;   // date-time string
  public form_of_intervention?: string;
  public form_of_intervention_others?: string;
  public note?: string;

  constructor(values: any) {
    super();
    this.date = values.date ? values.date : undefined;
    this.form_of_intervention = values.form_of_intervention ? values.form_of_intervention : undefined;
    this.form_of_intervention_others = values.form_of_intervention_others ? values.form_of_intervention_others : undefined;
    this.note = values.note ? values.note : undefined;
  }

}
