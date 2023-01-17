import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Item} from "../../../services/items/incident";
import {ConfigService} from "../../../../services/config/config.service";
import {ItemsService} from "../../../services/items/items.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDirective} from "ngx-bootstrap";
import {Evidence} from "../../../services/items/evidence";
import {Subscription} from "rxjs";
import {oneFieldOfCollectionFilledValidator} from "../../../../utils/check-one-field-of-collection-filled.validator";

@Component({
  selector: 'app-beweise',
  templateUrl: './beweise.component.html',
  styleUrls: ['./beweise.component.css']
})
export class BeweiseComponent implements OnInit, OnDestroy {
  @ViewChild('editEvidenceModal', {static: false}) editEvidenceModal: ModalDirective;
  @ViewChild('confirmDeleteItemModal', {static: false}) confirmDeleteItemModal: ModalDirective;

  item: Item;

  editEvidenceForm: FormGroup;

  headingId = 'beweise';
  heading:string;
  currentIndex = -1;

  constructor(
    private config: ConfigService,
    private items: ItemsService,
    private fb: FormBuilder
  ) { }

  subscr: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }
  ngOnInit() {
    this.subscr = this.items.getCurrentLoadedItem().subscribe(
      item => this.item = item
    );

    this.editEvidenceForm = this.fb.group({
      title: [''],
      place: ['']
    }, { validators: [
        oneFieldOfCollectionFilledValidator(
          ['title', 'place'])
      ]});

    this.clearInputs(this.editEvidenceForm);

    this.heading = this.config.getTabLabelForId(this.headingId);
  }

  public showDialog2AddEvidence() {
    this.clearInputs(this.editEvidenceForm);
    this.editEvidenceModal.show();
  }

  public clearInputs(form: FormGroup) {
    this.currentIndex = -1;
    form.setValue({
      title: '',
      place: ''
    });
  }

  /**
   *  submit data from modal form -> create evidence from data and update item
   */
  public onSubmitEvidence() {
    if (!this.item.evidence_list) this.item["evidence_list"] = [];
    const value = this.editEvidenceForm.value;
    if (this.currentIndex < 0) {
      this.item.evidence_list.push(value);
    } else {
      this.item.evidence_list[this.currentIndex] = value;
    }
    this.items.itemChanged(this.item);
    this.editEvidenceModal.hide();
    this.clearInputs(this.editEvidenceForm);
  }

  public editEvidence(index: number) {
    if (this.item && this.item.evidence_list && this.item.evidence_list.length > index){
      const evidence:Evidence = this.item.evidence_list[index];
      this.currentIndex = index;
      this.editEvidenceForm.setValue({
        title: evidence.title ? evidence.title : '',
        place: evidence.place ? evidence.place : ''
      });
      this.editEvidenceModal.show();
    } else {
      // TODO: handle error
    }
  }


  //////// delete ///////////
  /**
   * remember selected index for after user confrmed deletion
   */
  private selectedForDeletion: number;
  private deleteFromList: any[];

  /**
   * open confirm dialog
   * @param index: selected item
   */
  public delete(index: number, fromList: any[]) {
    this.selectedForDeletion = index;
    this.deleteFromList = fromList;
    this.confirmDeleteItemModal.show();
  }

  /**
   * deletion confirmed -> delete selection and update incident
   */
  public deleteConfirmed() {
    if (this.selectedForDeletion != undefined && this.deleteFromList && this.deleteFromList.length > this.selectedForDeletion){
      this.deleteFromList.splice(this.selectedForDeletion, 1);
      this.selectedForDeletion = undefined;
      this.items.itemChanged(this.item);
    } else {
      // TODO: handle error
    }
    this.confirmDeleteItemModal.hide();
  }
}

