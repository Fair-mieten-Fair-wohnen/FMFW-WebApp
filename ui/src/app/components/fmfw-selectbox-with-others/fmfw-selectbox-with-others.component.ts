import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ValueListItem} from "../../items/services/value-lists/value-list-item";
import {ValueListService} from "../../items/services/value-lists/value-list.service";
import {Subscription} from "rxjs";
import {filter, map} from "rxjs/operators";

/**
 * selectbox with others field, with valueList loaded from database
 * Documentation: https://indarium.atlassian.net/wiki/spaces/FMFW/pages/163938313/fmfw-selectbox+fmfw-selectbox-with-others
 */
@Component({
  selector: 'fmfw-selectbox-with-others',
  templateUrl: './fmfw-selectbox-with-others.component.html',
  styleUrls: ['./fmfw-selectbox-with-others.component.css']
})
export class FmfwSelectboxWithOthersComponent implements OnInit, OnDestroy {

  _formGroup: FormGroup;
  @Input()
  public set formGroup(fg: FormGroup){
    this._formGroup = fg as FormGroup;
    this.selected();
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
  @Input() notDisplayed: string[] = [];

  keyValueList: ValueListItem[];
  showOthersInput = false;

  selected() {
    this.showOthersInput = this._formGroup && this._formGroup.get("selected") && this._formGroup.get("selected").value === 'other';
  }

  constructor(
    private valueList: ValueListService,
  ) {}

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
    if (this.keyValueListName) {
      this.subscr = this.valueList.getValueList(this.keyValueListName).pipe(
        map(list => list.filter(listItem => !this.notDisplayed.includes(listItem.key))),
        map(list => {
          this.keyValueList = list;
          this.selected();
        }),
      ).subscribe();
    }
    this.subscr2 = this._formGroup.valueChanges.subscribe(_ => {
      this.selected();
    });
  }
}
