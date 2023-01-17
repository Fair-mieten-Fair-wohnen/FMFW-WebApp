import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from "../../../../services/config/config.service";
import {Item} from "../../../services/items/incident";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ItemsService} from "../../../services/items/items.service";
import {ValueListService} from "../../../services/value-lists/value-list.service";
import {GeneralUtilsService} from "../../../services/utils/general-utils.service";
import {Subscription} from "rxjs";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-kurzbeschreibung',
  templateUrl: './kurzbeschreibung.component.html',
  styleUrls: ['./kurzbeschreibung.component.css']
})
export class KurzbeschreibungComponent implements OnInit, OnDestroy {
  @ViewChild('template', { static: true }) public template: ElementRef;

  item: Item;

  incidentShortDescriptionForm: FormGroup;
  incidentPlaceForm: FormGroup;

  showTimeRange: boolean = false;
  dateLabel = 'Datum des Vorfalls:';
  rangeLabelVon = 'von:';
  incidentTimeLabel = this.dateLabel;

  headingId = 'kurzbeschreibung';
  heading:string;

  // incident date cannot be in the future
  maxDate = new Date();
  modalRef: BsModalRef;

  constructor(
    private config: ConfigService,
    private items: ItemsService,
    private valueList: ValueListService,
    private fb: FormBuilder,
    private utils: GeneralUtilsService,
    private modalService: BsModalService
  ) { }

  subscr: Subscription;
  subscr2: Subscription;
  subscr3: Subscription;
  subscr4: Subscription;
  subscr5: Subscription;
  subscr6: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
    if (this.subscr2) {
      this.subscr2.unsubscribe();
    }
    if (this.subscr3) {
      this.subscr3.unsubscribe();
    }
    if (this.subscr4) {
      this.subscr4.unsubscribe();
    }
    if (this.subscr5) {
      this.subscr5.unsubscribe();
    }
    if (this.subscr6) {
      this.subscr6.unsubscribe();
    }
  }
  ngOnInit() {
    this.incidentPlaceForm = this.fb.group(
      {
        incident_district: this.fb.group( {
          selected: [''],
          others: ['']
        }),
        incident_zipcode: ['']
      }
    );

    this.incidentShortDescriptionForm = this.fb.group({
      showTimeRange: [''],
      incident_date: null,
      incident_timerange_end: null,
      incident_time: null,
      generated_dates: this.fb.group(
        {
          complaint_until_date: {value: null, disabled: true},
          legal_action_until_date: {value: null, disabled: true},
          criminal_application_until_date: {value: null, disabled: true}
        }
      ),
      incident_place: this.incidentPlaceForm,
      incident_short_description: ['']
    });

    this.heading = this.config.getTabLabelForId(this.headingId);

    this.subscr = this.items.getCurrentLoadedItem().subscribe(
      item => this.initItem(item)
    );

    if (!this.item || !this.item.short_description) {
      // empty form
      this.incidentShortDescriptionForm.setValue({
        showTimeRange: false,
        incident_date: null,
        incident_timerange_end: null,
        incident_time: null,
        generated_dates: {
            complaint_until_date: null,
            legal_action_until_date: null,
            criminal_application_until_date: null
        },
        incident_place: {
          incident_district: {
            selected: '',
            others: ''
          },
          incident_zipcode: ''
        },
        incident_short_description: ''
      })
    }
  }

  public openTimeRangeField(selectedEvent: any) {
    this.showTimeRange = selectedEvent.target.checked;
    this.incidentTimeLabel = this.showTimeRange ? this.rangeLabelVon : this.dateLabel;
    if (!this.showTimeRange) {
      this.deleteIncidentTimeRangeEnd();
    }
  }

  private deleteIncidentTimeRangeEnd() {
    this.incidentShortDescriptionForm.patchValue({incident_timerange_end: null},{emitEvent: false});
  }

  private initItem(item: Item) {
    this.item = item;
    if (this.item && this.item.short_description) {

      let shortDescription: any = this.item.short_description;

      // transform dates
      const dates = this.transformDates(shortDescription);
      this.showTimeRange = shortDescription.incident_timerange_end !== undefined
        && shortDescription.incident_timerange_end !== null
        && shortDescription.incident_timerange_end !== '';

        // set data into formular
      const patchVal = {
        incident_date: dates.incident_date,
        generated_dates: dates.generated_dates,

        incident_timerange_end: shortDescription.incident_timerange_end || null,
        showTimeRange: this.showTimeRange,

        incident_time: shortDescription.incident_time || null,
        incident_short_description: shortDescription.incident_short_description || '',
        incident_place: {
          incident_district: {
            selected: '',
            others: ''
          },
          incident_zipcode: ''
        }
      };

      if (shortDescription.incident_place){
        patchVal.incident_place = {
          incident_district: this.utils.uniteSelectedAndOthers(shortDescription.incident_place,'incident_district'),
          incident_zipcode: shortDescription.incident_place.incident_zipcode ?
            shortDescription.incident_place.incident_zipcode : ''
        }
      }

      this.incidentShortDescriptionForm.setValue(patchVal);
    }

    this.onChanges();
  }

  /**
   * emit item changes to itemsService -> changes are stored locally and 'changed' flag is set to e.g. activate save button in footer
   */
  onChanges(): void {
    this.subscr2 = this.incidentShortDescriptionForm.get('incident_date').valueChanges.subscribe(val => {
      // calculate deadlines
      const dates = this.items.calculateDeadlinesFromIncidentDate(val);
      // patch form; emit = false to avoid endless loop
      this.incidentShortDescriptionForm.get('generated_dates').patchValue(dates['generated_dates'], {emitEvent: false});
      // update item
      this.updateItemData(dates);
      this.items.itemChanged(this.item);
      this.checkFromBeforeToDate(this.item.short_description.incident_date, this.item.short_description.incident_timerange_end);
    });
    this.subscr6 = this.incidentShortDescriptionForm.get('incident_timerange_end').valueChanges.subscribe(val => {
      if (!this.item.short_description) this.item["short_description"] = {};
      this.item.short_description.incident_timerange_end = val;
      this.items.itemChanged(this.item);
      this.checkFromBeforeToDate(this.item.short_description.incident_date, this.item.short_description.incident_timerange_end);
    });
    this.subscr3 = this.incidentShortDescriptionForm.get('incident_time').valueChanges.subscribe(val => {
      if (!this.item.short_description) this.item["short_description"] = {};
      this.item.short_description.incident_time = val;
      this.items.itemChanged(this.item);
    });
    this.subscr4 = this.incidentShortDescriptionForm.get('incident_place').valueChanges.subscribe(val => {
      if (!this.item.short_description) this.item["short_description"] = {};

      this.item.short_description.incident_place = val;

      this.item.short_description.incident_place = this.utils.extractSelectedAndOthers(
        val.incident_district,
        'incident_district',
        val);

      this.items.itemChanged(this.item);
    });
    this.subscr5 = this.incidentShortDescriptionForm.get('incident_short_description').valueChanges.subscribe(val => {
      if (!this.item.short_description) this.item["short_description"] = {};
      this.item.short_description.incident_short_description = val;
      this.items.itemChanged(this.item);
    });
  }

  /**
   * transform every date string from data structure into Date object
   * @param val item.short_description data structure
   */
  private transformDates(val: any): any {
    let dates = this.items.createEmptyDatesStructure();
    dates.incident_date = val.incident_date ? val.incident_date : null;
    if (val.generated_dates) {
      dates.generated_dates.complaint_until_date = val.generated_dates.complaint_until_date ?
        val.generated_dates.complaint_until_date : null;
      dates.generated_dates.legal_action_until_date = val.generated_dates.legal_action_until_date ?
        val.generated_dates.legal_action_until_date : null;
      dates.generated_dates.criminal_application_until_date = val.generated_dates.criminal_application_until_date ?
        val.generated_dates.criminal_application_until_date : null;
    }
    return dates;
  }

  private checkFromBeforeToDate(fromStr: string, toStr: string): void {
    if (fromStr && toStr) {
      const from = new Date(fromStr);
      const to = new Date(toStr);
      if (from > to) {
        this.modalRef = this.modalService.show(this.template);
      }
    }
  }

  /**
   * update item.short_description dates with form data dates
   * @param dates
   */
  private updateItemData(dates: any){
    if (!this.item.short_description) this.item["short_description"] = {};

    this.item.short_description.incident_date = dates.incident_date;
    this.item.short_description.generated_dates = dates.generated_dates;
  }
}
