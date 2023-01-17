import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'fmfw-date-select',
  templateUrl: './fmfw-date-select.component.html',
  styleUrls: ['./fmfw-date-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FmfwDateSelectComponent),
      multi: true
    }
  ]
})
export class FmfwDateSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() label: string;
  @Input() placeholder: string;
  @Input() formId: string;

  dateForm: FormGroup;
  disabled:boolean = false;
  dateValueSet: boolean = false;

  constructor(
    private fb: FormBuilder
  ) { }

  onChange;
  writeValue(value) {
    this.dateValueSet = !(value === null || value === undefined);
    this.dateForm.setValue({
      date: value ? new Date(value) : null
    });
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {  }

  setDisabledState(isDisabled: boolean){
    this.disabled=isDisabled;
  }

  subscr: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }
  ngOnInit() {
    this.dateForm = this.fb.group({
      date: null
    });

    this.dateForm.setValue({
      date: new Date()
    });

    this.subscr = this.dateForm.valueChanges.subscribe(val => {
      if (this.onChange) {
        this.dateValueSet = !(val.date === null || val.date === undefined);
        if (val.date) {
          this.onChange(val.date.toISOString());
        } else {
          this.onChange(null);
        }
      }
    });
  }

  deleteItem() {
    this.dateForm.setValue({
      date: null
    });
  }

}
