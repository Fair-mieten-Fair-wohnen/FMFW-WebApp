import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from "../../../../services/config/config.service";
import {ModalDirective} from "ngx-bootstrap";
import {Item} from "../../../services/items/incident";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemsService} from "../../../services/items/items.service";
import {InvolvedPerson} from "../../../services/items/involved-person";
import {Evidence} from "../../../services/items/evidence";
import {oneFieldFilledValidator} from "../../../../utils/check-one-field-filled.directive";
import {Causer} from "../../../services/items/causer";
import {ContactData} from "../../../services/items/contact-data";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-zeugen-beweise',
  templateUrl: './zeuginnen.component.html',
  styleUrls: ['./zeuginnen.component.css']
})
export class ZeuginnenComponent implements OnInit, OnDestroy {
  @ViewChild('editInvolvedModal', {static: false}) editInvolvedModal: ModalDirective;
  @ViewChild('confirmDeleteItemModal', {static: false}) confirmDeleteItemModal: ModalDirective;

  item: Item;

  headingId = 'zeuginnen';
  heading:string;

  editInvolvedForm: FormGroup;
  contactForm: FormGroup;
  addressForm: FormGroup;

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
    this.subscr = this.items.getCurrentLoadedItem().subscribe(       item => this.item = item     );

    // preparing address form -> added to contactForm
    this.addressForm = this.fb.group({
      street: [''],
      number: [''],
      city: [''],
      zip: ['', [Validators.pattern(/^[\d]{5,5}$/)]],
    });

    // preparing contact form
    this.contactForm = this.fb.group({
      address: this.addressForm,
      email: ['', Validators.pattern(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)],
      phone: ['', [Validators.pattern(/^[\d()\-\_#\ \+]{4,}$/)]]
    });

    this.editInvolvedForm = this.fb.group({
      name: [''],
      contact: this.contactForm,
      note: ['']
    }, { validator: oneFieldFilledValidator});

    this.clearInputs(this.editInvolvedForm);

    this.heading = this.config.getTabLabelForId(this.headingId);
  }

  public showDialog2AddInvolved() {
    this.clearInputs(this.editInvolvedForm);
    this.editInvolvedModal.show();

  }
  /**
   *  submit data from modal form -> create involved from data and update item
   */
  public onSubmitInvolved() {
    if (!this.item.involved_list) this.item["involved_list"] = [];

    this.addOrUpdateInvolved(this.editInvolvedForm.value);

    this.items.itemChanged(this.item);
    this.editInvolvedModal.hide();
    this.clearInputs(this.editInvolvedForm);
  }

  private addOrUpdateInvolved(value: any) {
    let involved = new InvolvedPerson({
      name: value.name,
      note: value.note
    });

    const contact = new ContactData(value.contact);
    if (contact) {
      contact.addTo(involved);
    }

    if (this.currentIndex < 0) {
      if (!this.item.involved_list) {
        this.item.involved_list = [];
      }
      this.item.involved_list.push(involved);
    } else {
      this.item.involved_list[this.currentIndex] = involved;
    }
  }

  public clearInputs(form: FormGroup) {
    this.currentIndex = -1;
    form.setValue({
      name: '',
      contact: {
        address: {
          street: '',
          number: '',
          city: '',
          zip: ''
        },
        email: '',
        phone: ''
      },
      note: ''
    });
  }

  public editInvolved(index: number) {
    if (this.item && this.item.involved_list && this.item.involved_list.length > index){
      const involved:InvolvedPerson = this.item.involved_list[index];
      this.currentIndex = index;
      this.editInvolvedForm.setValue({
        name: involved.name ? involved.name : '',
        contact: new ContactData(involved).toFormString(),
        note: involved.note ? involved.note : ''
      });
      this.editInvolvedModal.show();
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
