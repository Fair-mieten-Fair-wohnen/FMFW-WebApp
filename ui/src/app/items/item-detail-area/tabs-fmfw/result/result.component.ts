import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from "../../../services/items/incident";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ConfigService} from "../../../../services/config/config.service";
import {ItemsService} from "../../../services/items/items.service";
import {ValueListService} from "../../../services/value-lists/value-list.service";
import {GeneralUtilsService} from "../../../services/utils/general-utils.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {

  item: Item;

  headingId = 'result';
  heading:string;

  incidentCompletionForm: FormGroup;

  constructor(
    private config: ConfigService,
    private items: ItemsService,
    private valueLists: ValueListService,
    private fb: FormBuilder,
    private utils: GeneralUtilsService
  ) { }

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
    this.incidentCompletionForm = this.fb.group({
      result: this.fb.group( {
        selected: [''],
        others: ['']
      }),
      result_description: ['']
    });

    this.incidentCompletionForm.setValue({
      // empty form
      result: {
        selected: '',
        others: ''
      },
      result_description: ''
    }, {emitEvent: false});

    this.subscr = this.items.getCurrentLoadedItem().subscribe(
      item => this.initItem(item)
    );

    this.heading = this.config.getTabLabelForId(this.headingId);
  }

  private initItem(item: Item) {

    this.item = item;

    if (this.item && this.item.completion) {

      const completion = this.item.completion;

      this.incidentCompletionForm.setValue({
        result: this.utils.uniteSelectedAndOthers(completion,'result'),
        result_description:
          completion.result_description ?
          this.item.completion.result_description : '',
      }, {emitEvent: false});
    }

    this.onChanges();
  }

  onChanges(): void {
    this.subscr2 = this.incidentCompletionForm.valueChanges.subscribe(val => {
      this.item.completion = val;
      this.item.completion = this.utils.extractSelectedAndOthers(
        val.result,
        'result',
        val);

      this.items.itemChanged(this.item);
    });
  }
}
