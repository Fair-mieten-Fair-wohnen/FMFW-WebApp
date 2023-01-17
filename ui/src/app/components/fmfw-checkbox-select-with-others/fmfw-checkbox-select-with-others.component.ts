import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'fmfw-checkbox-select-with-others',
  templateUrl: './fmfw-checkbox-select-with-others.component.html',
  styleUrls: ['./fmfw-checkbox-select-with-others.component.css']
})
export class FmfwCheckboxSelectWithOthersComponent implements OnInit, OnDestroy {

  _formGroup: FormGroup;
  @Input()
  public set formGroup(fg: FormGroup){
    this._formGroup = fg;
    // check initially if others field needs to be displayed
    this.selected();
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
    this.subscr = this._formGroup.valueChanges.subscribe(_ => {
      this.selected();
    });
  }
  _formId: string;
  _othersFormId: string;
  @Input()
  public set formId(formId: string) {
    this._formId = formId;
    this._othersFormId = formId + 'Others'
  };
  @Input() label: string;
  @Input() keyValueListName: string;
  @Input() othersFieldPlaceholder: string;

  showOthersInput = false;

  constructor() { }

  subscr: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }
  ngOnInit() {
  }

  /**
   * checks if others field needs to be displayed or hidden
   */
  selected() {
    this.showOthersInput = this._formGroup && this._formGroup.get("selected") && this._formGroup.get("selected").value &&  this._formGroup.get("selected").value.includes('other');
  }
}
