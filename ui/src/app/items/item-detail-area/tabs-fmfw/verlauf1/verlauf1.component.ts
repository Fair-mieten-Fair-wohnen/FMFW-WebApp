import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "../../../../services/config/config.service";
import {Item} from "../../../services/items/incident";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ItemsService} from "../../../services/items/items.service";
import {GeneralUtilsService} from "../../../services/utils/general-utils.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-verlauf1',
  templateUrl: './verlauf1.component.html',
  styleUrls: ['./verlauf1.component.css']
})
export class Verlauf1Component implements OnInit, OnDestroy {

  item: Item;

  incidentProcessBlog1Form: FormGroup;

  headingId = 'verlauf1';
  heading:string;

  constructor(
    private config: ConfigService,
    private items: ItemsService,
    private utils: GeneralUtilsService,
    private fb: FormBuilder
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
    this.incidentProcessBlog1Form = this.fb.group({
      goal_person_concerned: this.fb.group( {
        selected: [''],
        others: ['']
      }),
      areas_of_law: this.fb.group( {
        selected: [''],
        others: ['']
      }),
      approach: ['']
    });

    this.incidentProcessBlog1Form.setValue({
      // empty form
      goal_person_concerned: {
        selected: '',
        others: ''
      },
      areas_of_law: {
        selected: '',
        others: ''
      },
      approach: ''
    }, {emitEvent: false});

    this.heading = this.config.getTabLabelForId(this.headingId);

    // load item
    this.subscr = this.items.getCurrentLoadedItem().subscribe(item => {
      this.initItem(item);
    });
  }

  /**
   * fill stored item properties into form
   * @param item
   */
  private initItem(item: Item) {
    this.item = new Item(item);
    if (this.item && this.item.process_blog_part1) {
      const approachBlog = this.item.process_blog_part1;
      let val = {
        goal_person_concerned: this.utils.uniteSelectedAndOthers(approachBlog,'goal_person_concerned'),
        areas_of_law: this.utils.uniteSelectedAndOthers(approachBlog,'areas_of_law'),
        approach: approachBlog.approach ?
          approachBlog.approach : '',
      };
      this.incidentProcessBlog1Form.patchValue(val, {emitEvent: false});
    }
    // everything loaded and displayed => activate event listener
    this.onChanges();
  }

  /**
   * emit item changes to itemsService -> changes are stored locally and 'changed' flag is set to e.g. activate save button in footer
   */
  onChanges(): void {
    this.subscr2 = this.incidentProcessBlog1Form.valueChanges.subscribe(value => {
      this.item.process_blog_part1 = value;
      this.item.process_blog_part1 = this.utils.extractSelectedAndOthers(
        value.goal_person_concerned,
        'goal_person_concerned',
        value);
      this.item.process_blog_part1 = this.utils.extractSelectedAndOthers(
        value.areas_of_law,
        'areas_of_law',
        value);
      this.items.itemChanged(this.item);
    });
  }
}
