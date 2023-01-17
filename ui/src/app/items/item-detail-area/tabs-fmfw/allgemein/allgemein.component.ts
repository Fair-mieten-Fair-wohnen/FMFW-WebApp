import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from "../../../../services/config/config.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ItemsService} from "../../../services/items/items.service";
import {Item} from "../../../services/items/incident";
import {GeneralUtilsService} from "../../../services/utils/general-utils.service";
import {ModalDirective} from "ngx-bootstrap";
import {Observable, of, Subscription} from "rxjs";

@Component({
  selector: 'app-allgemein',
  templateUrl: './allgemein.component.html',
  styleUrls: ['./allgemein.component.css']
})
export class AllgemeinComponent implements OnInit, OnDestroy {
  @ViewChild('infoAnonymousLooseDataModal', {static: false}) infoAnonymousLooseDataModal: ModalDirective;

  item: Item;

  incidentGeneralDataForm: FormGroup;

  headingId = 'allgemein';
  heading: string;
  subscr: Subscription;
  subscr2: Subscription;
  subscr3: Subscription;
  notListedResponsibleInstitutions: string[] = ['fmfw_fachstelle'];

  constructor(
    private config: ConfigService,
    private items: ItemsService,
    private fb: FormBuilder,
    private utils: GeneralUtilsService
  ) {
  }

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
  }

  ngOnInit() {
    this.incidentGeneralDataForm = this.fb.group({
      external_incident: [''],
      responsible_institution: this.fb.group({
        selected: [''],
        others: ['']
      }),
      contact_by: [''],
      first_contact_date: null,
      anonymous: [''],
      consent_granted: [''],
      type_of_advise: [''],
      become_aware_of: this.fb.group({
        selected: [''],
        others: ['']
      }),
      advise_language: this.fb.group({
        selected: [''],
        others: ['']
      }),
      general_comment: ['']
    });

    this.subscr = this.items.getCurrentLoadedItem().subscribe(
      item => this.initItem(item)
    );

    if (!this.item || !this.item.generaldata) {
      this.incidentGeneralDataForm.setValue(this.initEmptyForm());
    }

    this.heading = this.config.getTabLabelForId(this.headingId);

    this.onChanges();
  }

  /**
   * emit item changes to itemsService -> changes are stored locally and 'changed' flag is set to e.g. activate save button in footer
   */
  onChanges(): void {
    this.subscr2 = this.incidentGeneralDataForm.valueChanges.subscribe(val => {
      // if user just set anonymous flag -> show confirm dialog
      if (val.anonymous === true && this.item && this.item.generaldata && !this.item.generaldata.anonymous)
        this.infoAnonymousLooseDataModal.show();
      else {
        // update item
        this.item.generaldata = this.prepareGeneralData(val);

        this.item.metadata = this.handleExternalIncident(val);

        this.items.itemChanged(this.item);
      }
    });
  }

  /**
   * Cancel
   */
  cancel() {
    this.infoAnonymousLooseDataModal.hide();
    // reset selection to item.type
    this.incidentGeneralDataForm.patchValue({
      anonymous: false
    });
  }

  /**
   * confirm
   */
  activateAnonymous() {
    this.infoAnonymousLooseDataModal.hide();

    // set anonymous flag
    this.item.generaldata.anonymous = true;

    // save item to cleanup data that's not allowed to collect in an anonymous incident
    if (this.subscr3) {
      this.subscr3.unsubscribe();
    }
    this.subscr3 = this.items.updateItem(this.item).subscribe(
      item => this.initItem(item)
    )
    // TODO: error handling (see footer component)
  }

  private initItem(item: Item) {
    this.item = item;
    if (this.item && this.item.generaldata) {
      // initialize with data
      this.incidentGeneralDataForm.patchValue({
        contact_by: this.item.generaldata.contact_by,
        first_contact_date: this.utils.string2date(this.item.generaldata.first_contact_date),
        consent_granted: this.item.generaldata.consent_granted,
        type_of_advise: this.item.generaldata.type_of_advise,
        become_aware_of: this.utils.uniteSelectedAndOthers(this.item.generaldata, 'become_aware_of'),
        advise_language: this.utils.uniteSelectedAndOthers(this.item.generaldata, 'advise_language'),
        general_comment: this.item.generaldata.general_comment,
        anonymous: this.item.generaldata.anonymous !== undefined ? this.item.generaldata.anonymous : '',

        external_incident: this.item.metadata && this.item.metadata.external_incident !== undefined ?
          this.item.metadata.external_incident : false,
        responsible_institution: this.utils.uniteSelectedAndOthers(this.item.metadata, 'responsible_institution'),

      });
    }
  }

  private handleExternalIncident(val: any): any {

    let metaData: any = this.item.metadata || {};

    metaData.external_incident = val.external_incident || false;

    metaData = this.utils.extractSelectedAndOthers(
      val.responsible_institution,
      'responsible_institution',
      metaData);

    return metaData;
  }

  private initEmptyForm(): any {
    let val = {
      contact_by: '',
      first_contact_date: null,
      anonymous: '',
      consent_granted: '',
      type_of_advise: '',
      become_aware_of: {
        selected: '',
        others: ''
      },
      advise_language: {
        selected: '',
        others: ''
      },
      general_comment: '',
      external_incident: '',
      responsible_institution: {
        selected: '',
        others: ''
      },
    };
    return val;
  }

  private prepareGeneralData(given: any): any {

    let generalData: any = {
      contact_by: given.contact_by || undefined,
      first_contact_date: this.utils.date2ISOString(given.first_contact_date) || undefined,
      anonymous: given.anonymous !== undefined ? given.anonymous : undefined,
      consent_granted: given.consent_granted !== undefined ? given.consent_granted : undefined,
      type_of_advise: given.type_of_advise || undefined,
      general_comment: given.general_comment || undefined
    };

    generalData = this.utils.extractSelectedAndOthers(
      given.become_aware_of,
      'become_aware_of',
      generalData);

    generalData = this.utils.extractSelectedAndOthers(
      given.advise_language,
      'advise_language',
      generalData);

    return generalData;
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.item.metadata.external_incident && !this.item.metadata.responsible_institution) {
      window.alert('Sie haben diesen Vorgang als extern markiert. Bitte deaktivieren Sie dies oder wählen Sie den externen Träger/die externe Institution aus!');

      return false;
    }
    return true;
  }
}
