/** At least one value must be set in formGroup */
import {FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export const oneFieldOfCollectionFilledValidator= (keys: string[]): ValidatorFn => {
  return (control: FormGroup): ValidationErrors | null => {
    const filledFields = keys.filter(
      val => (control.controls[val] && control.controls[val].value && control.controls[val].value.length > 0));
    return filledFields.length > 0 ? null : {'emptyFormCannotSubmitted': true};
  }
};
