import {Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ValueListItem} from "../../items/services/value-lists/value-list-item";
import {NG_VALUE_ACCESSOR, SelectControlValueAccessor} from "@angular/forms";
import {ValueListService} from "../../items/services/value-lists/value-list.service";
import {TEXTVIEW_FORMATS} from "../fmfw-textview/fmfw-textview.component";
import {ConfigService} from "../../services/config/config.service";
import {Subscription} from "rxjs";

/**
 * simple selectbox, with valueList loaded from database
 * Documentation: https://indarium.atlassian.net/wiki/spaces/FMFW/pages/163938313/fmfw-selectbox+fmfw-selectbox-with-others
 */
@Component({
  selector: 'fmfw-selectbox',
  templateUrl: './fmfw-selectbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FmfwSelectboxComponent),
      multi: true
    }
  ],
  styleUrls: ['./fmfw-selectbox.component.css']
})
export class FmfwSelectboxComponent extends SelectControlValueAccessor implements OnInit, OnDestroy {

  @Input() formId: string;
  @Input() label: string;
  @Input() keyValueListName: string;
  @Input() optionsFormat: string = "text";
  @Input()
  set keyValueList(list: ValueListItem[]) {
    this._keyValueList = list;
  };

  onChange: (_: any) => void;
  onTouched: () => void;
  value: any;
  _keyValueList: ValueListItem[];

  dateTimeFormat: string;

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }
  registerOnChange(fn: (value: any) => any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  selected() {
    this.onChange(this.value);
  }

  constructor(
    _renderer: Renderer2,
    _elementRef: ElementRef,
    private valueList: ValueListService,
    private config: ConfigService
  ) {
    super(_renderer, _elementRef);
  }

  subscr: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }
  ngOnInit() {
    if (this.optionsFormat === "date") {
      this.dateTimeFormat = this.config.getString('DATE_TIME_FORMAT');
    }

    if (this.keyValueListName) {
      this.subscr = this.valueList.getValueList(this.keyValueListName).subscribe(
        list => this._keyValueList = list );
    }
  }

  /**
   * emit selection changes
   */
  selectionChanged(selection: string[]) {
    this.value = selection;
    this.onChange(this.value);
    this.onTouched();
  }

  singleSelectionChanged() {
    // in a select without single the selection is not returned as an array
    this.selectionChanged(Array.isArray(this.value) ? this.value : [this.value]);
  }
}
