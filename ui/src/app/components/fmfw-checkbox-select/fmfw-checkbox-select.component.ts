import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import {ValueListService} from "../../items/services/value-lists/value-list.service";
import {ValueListItem} from "../../items/services/value-lists/value-list-item";
import {Subscription} from "rxjs";

@Component({
  selector: 'fmfw-checkbox-select',
  templateUrl: './fmfw-checkbox-select.component.html',
  styleUrls: ['./fmfw-checkbox-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FmfwCheckboxSelectComponent),
      multi: true
    }
  ]
})
export class FmfwCheckboxSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() keyValueListName: string;

  formId: string;
  checkboxForm: FormGroup;
  selectedValues: string[];
  keyValueList: ValueListItem[];
  loaded = false;

  constructor(
    private valueListService: ValueListService,
    private fb: FormBuilder
  ) { }

  onChange;
  writeValue(value) {
    if (value) {
      this.selectedValues = value;
    }
    this.activateCheckboxes();

  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {  }

  subscr: Subscription;
  subscr2: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
    if (this.subscr2) {
      this.subscr2.unsubscribe();
    }
  }
  ngOnInit() {
    this.checkboxForm = this.fb.group({
      // empty form
      checkboxes: this.fb.array([ ])
    });

    if (this.keyValueListName) {
      this.formId = this.keyValueListName;
      this.subscr = this.valueListService.getValueList(this.keyValueListName).subscribe(
        list => {
          this.keyValueList = list;
          this.initializeCheckboxGroup();
          if (this.subscr2) {
            this.subscr2.unsubscribe();
          }
          this.subscr2 = this.checkboxForm.valueChanges.subscribe(selection =>
            this.selected(selection));
          // inform the outer world that component resources are loaded
          this.loaded = true;
        } );
    }
  }

  selected(val: any) {
    const emitVal = val && val.checkboxes ?
        val.checkboxes
          .filter(item => item.selected)
          .map(item => item.key )
        : [];
    // emit selection
    if (this.onChange){
      this.onChange( emitVal );
    }
  }

  private initializeCheckboxGroup() {
    this.keyValueList.forEach(val => {
      this.checkboxes.push(this.createValueListItem(val));
    });
  }

  private createValueListItem(val?: any): FormGroup {
    let isSelected = false;
    if (val){
      if (this.selectedValues && val.key && val.key.length > 0) {
        isSelected = this.selectedValues.includes(val.key);
      } else {
        isSelected = val.selected;
      }
    }
    return this.fb.group({
      key: val && val.key ? val.key : '',
      label: val && val.label ? val.label : '',
      selected: isSelected,
    });
  }

  private activateCheckboxes() {
    if (this.selectedValues) {
      this.checkboxes.controls.forEach(val => {
        const ctrl = val["controls"];
        val["controls"].selected.setValue(this.selectedValues.includes(ctrl.key.value));
      });
    }
  }

  get checkboxes(): FormArray {
    return this.checkboxForm.get('checkboxes') as FormArray;
  }

}
