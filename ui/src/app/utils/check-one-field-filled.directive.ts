/** At least one value must be set in formGroup */
import {FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export const oneFieldFilledValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const filledFields = Object.keys(control.controls).filter(
    val => (control.controls[val] && control.controls[val].value && control.controls[val].value.length > 0));
  return filledFields.length > 0 ? null : { 'emptyFormCannotSubmitted': true };
};
