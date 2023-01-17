import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from "../../../../services/config/config.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Item} from "../../../services/items/incident";
import {ItemsService} from "../../../services/items/items.service";
import {ValueListService} from "../../../services/value-lists/value-list.service";
import {ModalDirective} from "ngx-bootstrap";
import {LoggingService} from "../../../../services/logging/logging.service";
import {GeneralUtilsService} from "../../../services/utils/general-utils.service";
import {Supporter} from "../../../services/items/supporter";
import {Intervention} from "../../../services/items/intervention";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-verlauf2',
  templateUrl: './verlauf2.component.html',
  styleUrls: ['./verlauf2.component.css']
})
export class Verlauf2Component implements OnInit, OnDestroy {
  @ViewChild('editInterventionModal', {static: false}) editInterventionModal: ModalDirective;
  @ViewChild('confirmDeleteItemModal', {static: false}) confirmDeleteItemModal: ModalDirective;

  dateFormat = 'dd.MM.yyyy';
  item: Item;

  editInterventionForm: FormGroup;

  currentIndex = -1;

  headingId = 'verlauf2';
  heading: string;

  constructor(
    private config: ConfigService,
    private items: ItemsService,
    private valueLists: ValueListService,
    private fb: FormBuilder,
    private logger: LoggingService,
    private utils: GeneralUtilsService
  ) {
  }

  subscr: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }
  ngOnInit() {

    this.editInterventionForm = this.fb.group({
      date: [null, Validators.required],
      form_of_intervention: this.fb.group({
        selected: ['', Validators.required],
        others: ['']
      }),
      note: ['']
    });

    this.subscr = this.items.getCurrentLoadedItem().subscribe(
      item => this.item = item
    );

    this.heading = this.config.getTabLabelForId(this.headingId);
    this.dateFormat = this.config.getString('DATE_FORMAT');

  }

  public showDialog2AddIntervention() {
    this.clearInputs();
    this.editInterventionModal.show();
  }

  public clearInputs() {
    this.currentIndex = -1;
    this.editInterventionForm.setValue({
      date: new Date(),
      form_of_intervention: {
        selected: '',
        others: ''
      },
      note: ''
    });
  }

  public submitEditIntervention() {

    if (!this.item.interventions) this.item["interventions"] = [];

    this.addOrUpdateIntervention(this.editInterventionForm.value);

    this.items.itemChanged(this.item);
    this.editInterventionModal.hide();
    this.clearInputs();
  }

  public addOrUpdateIntervention(value: any) {
    let intervention = new Intervention({
      date: value.date,
      form_of_intervention: value.form_of_intervention.selected,
      form_of_intervention_others: value.form_of_intervention.others,
      note: value.note
    });

    if (this.currentIndex < 0) {
      this.item.interventions.push(intervention);
    } else {
      this.item.interventions[this.currentIndex] = intervention;
    }

  }

  public editIntervention(index: number) {
    if (this.item && this.item.interventions && this.item.interventions.length > index) {
      const sup = this.item.interventions[index];
      this.currentIndex = index;
      this.editInterventionForm.setValue({
        date: sup.date ? sup.date : null,
        form_of_intervention: this.utils.uniteSelectedAndOthers(sup, 'form_of_intervention'),
        note: sup.note ? sup.note : ''
      });
      this.editInterventionModal.show();
    }
    // TODO: else: handle error
  }

  //////// delete ///////////
  /**
   * remember selected index for after user confrmed deletion
   */
  private selectedForDeletion: number;

  /**
   * open confirm dialog
   * @param index: selected item
   */
  public deleteIntervention(index: number) {
    this.selectedForDeletion = index;
    this.confirmDeleteItemModal.show();
  }

  /**
   * deletion confirmed -> delete selection and update incident
   */
  public deleteConfirmed() {
    if (this.selectedForDeletion != undefined && this.item.interventions && this.item.interventions.length > this.selectedForDeletion) {
      this.item.interventions.splice(this.selectedForDeletion, 1);
      this.selectedForDeletion = undefined;
      this.items.itemChanged(this.item);
    } else {
      // TODO: handle error
    }
    this.confirmDeleteItemModal.hide();
  }
}
