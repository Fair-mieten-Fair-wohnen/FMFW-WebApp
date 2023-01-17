import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {of, Subscription} from "rxjs";

@Component({
  selector: 'fmfw-item-search',
  templateUrl: './fmfw-item-search.component.html',
  styleUrls: ['./fmfw-item-search.component.css']
})
export class FMFWItemSearchComponent implements OnInit, OnDestroy {
  @Input()
  set searchInitString(searchStr: string) {
    this.setSearchString(searchStr);
  };

  @Output() searchStringChanged = new EventEmitter<string>();

  itemSearchForm: FormGroup;
  searchField: FormControl;

  constructor(
    private fb: FormBuilder
  ) {
    this.searchField = new FormControl('', Validators.minLength(3));
    this.itemSearchForm = this.fb.group({searchstring: this.searchField});

    this.subscr = this.searchField.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term) => {
        return of((term as string).length >= 3 ? term as string : '');
      })
    ).subscribe((relevantSearchString) => {
      this.searchStringChanged.emit(relevantSearchString);
    });
  }

  subscr: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }
  ngOnInit() {
  }

  public resetSearch() {
    this.setSearchString('');
  }

  private setSearchString(searchStr: string) {
    this.itemSearchForm.setValue({
      searchstring: searchStr
    });
  }
}
