import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ContactData} from "../../items/services/items/contact-data";
import {Subscription} from "rxjs";

@Component({
  selector: 'fmfw-contact-input',
  templateUrl: './fmfw-contact-input.component.html',
  styleUrls: ['./fmfw-contact-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FmfwContactInputComponent),
      multi: true
    }
  ]
})
export class FmfwContactInputComponent implements OnInit, OnDestroy {

  _formGroup: FormGroup;
  @Input()
  public set formGroup(fg: FormGroup){
    this._formGroup = fg;
  }
  @Input() formId: string;
  @Input() label: string;

  isContactDataInserted: boolean = false;
  _addContactData: boolean = false;

  constructor() { }
  subscr: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }
  ngOnInit() {
    this.onChanges(this._formGroup.value);
    this.subscr = this._formGroup.valueChanges.subscribe(value => this.onChanges(value));
  }

  private onChanges(value: any) {
    const contact = new ContactData(value);
    if (contact) {
      this.isContactDataInserted = contact.isContactDataInserted();
    }
  }

  set addContactData(doit: boolean) {
    this._addContactData = doit;
  }

  get addContactData(): boolean {
    return this._addContactData;
  }
}
