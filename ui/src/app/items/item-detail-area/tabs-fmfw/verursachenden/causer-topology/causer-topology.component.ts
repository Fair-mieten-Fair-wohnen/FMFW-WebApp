import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'fmfw-causer-topology',
  templateUrl: './causer-topology.component.html',
  styleUrls: ['./causer-topology.component.css']
})
export class CauserTopologyComponent implements OnInit, OnDestroy {

  _formGroup: FormGroup;
  @Input()
  public set formGroup(fg: FormGroup){
    this._formGroup = fg;
  }
  @Input() formId: string;
  @Input() label: string;

  showAdditionalInputs: boolean;
  isDataInserted: boolean;
  addCauserTypology: boolean;

  constructor() { }

  subscr: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }
  ngOnInit() {
    this.showAdditionalInputs = false;
    this.isDataInserted = false;
    this.addCauserTypology = false;
    this.onChanges(this._formGroup.value);
    this.subscr = this._formGroup.valueChanges.subscribe(value => this.onChanges(value));
  }

  private onChanges(value: any) {
    this.isDataInserted = value.causer_type && value.causer_type.selected;
    this.showAdditionalInputs = value.causer_type && value.causer_type.selected && (
      value.causer_type.selected === "owner" || value.causer_type.selected === "agency");
  }

}
