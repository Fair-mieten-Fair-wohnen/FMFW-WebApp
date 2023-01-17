import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from "../../../../services/config/config.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemsService} from "../../../services/items/items.service";
import {ValueListService} from "../../../services/value-lists/value-list.service";
import {Item} from "../../../services/items/incident";
import {ModalDirective} from "ngx-bootstrap";
import {LoggingService} from "../../../../services/logging/logging.service";
import {oneFieldOfCollectionFilledValidator} from "../../../../utils/check-one-field-of-collection-filled.validator";
import {ContactData} from "../../../services/items/contact-data";
import {Supporter} from "../../../services/items/supporter";
import {GeneralUtilsService} from "../../../services/utils/general-utils.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-unterstuetzung',
  templateUrl: './unterstuetzung.component.html',
  styleUrls: ['./unterstuetzung.component.css']
})
export class UnterstuetzungComponent implements OnInit, OnDestroy {
  @ViewChild('editSupporterModal', {static: false}) editSupporterModal: ModalDirective;
  @ViewChild('confirmDeleteItemModal', {static: false}) confirmDeleteItemModal: ModalDirective;

  item: Item;

  headingId = 'unterstuetzung';
  heading:string;

  editSupporterForm: FormGroup;
  supporterNameForm: FormGroup;
  supportTypeForm: FormGroup;
  contactForm: FormGroup;
  addressForm: FormGroup;
  currentIndex = -1;

  constructor(
    private config: ConfigService,
    private items: ItemsService,
    private valueLists: ValueListService,
    private fb: FormBuilder,
    private logger: LoggingService,
    private utils: GeneralUtilsService
  ) { }

  subscr: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }
  ngOnInit() {

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

    this.supporterNameForm = this.fb.group({
      institution_name: [''],
      supporter_name: [''],
    }, { validators: [
        oneFieldOfCollectionFilledValidator(
          ['institution_name', 'supporter_name'])
      ]});

    this.supportTypeForm = this.fb.group( {
        selected: [''],
        others: ['']
      }, { validators: [
        oneFieldOfCollectionFilledValidator(
          ['selected'])
      ]});

    this.editSupporterForm = this.fb.group({
      support_format: this.supportTypeForm,
      names: this.supporterNameForm,
      contact: this.contactForm
    });

    this.clearInputs();

    this.subscr = this.items.getCurrentLoadedItem().subscribe(       item => this.item = item     );

    this.heading = this.config.getTabLabelForId(this.headingId);

  }

  public showDialog2AddSupporter() {
    this.clearInputs();
    this.editSupporterModal.show();
  }

  /**
   *  submit data from modal form -> create supporter from data and update item
   */
  public onSubmit() {
    if (!this.item.supporter_list) this.item["supporter_list"] = [];

    this.addOrUpdateSupporter(this.editSupporterForm.value);

    this.items.itemChanged(this.item);
    this.editSupporterModal.hide();
    this.clearInputs();
  }

  private addOrUpdateSupporter(value: any) {
    let supporter = new Supporter({
      support_format: value.support_format.selected,
      support_format_others: value.support_format.others,
      institution_name: value.names.institution_name,
      supporter_name: value.names.supporter_name,
    });

    const contact = new ContactData(value.contact);
    if (contact) {
      contact.addTo(supporter);
    }

    if (this.currentIndex < 0) {
      if (!this.item.supporter_list) {
        this.item.supporter_list = [];
      }
      this.item.supporter_list.push(supporter);
    } else {
      this.item.supporter_list[this.currentIndex] = supporter;
    }
  }

  public clearInputs() {
    this.currentIndex = -1;
    this.editSupporterForm.setValue({
      support_format: {
        selected: '',
        others: ''
      },
      names: {
        institution_name: '',
        supporter_name: '',
      },
      contact: {
        address: {
          street: '',
          number: '',
          city: '',
          zip: ''
        },
        email: '',
        phone: ''
      }
    });
  }

  public editSupporter(index: number) {
    if (this.item && this.item.supporter_list && this.item.supporter_list.length > index){
      const sup = this.item.supporter_list[index];
      this.currentIndex = index;
      this.editSupporterForm.setValue({
        support_format: this.utils.uniteSelectedAndOthers(sup,'support_format'),
        names: {
          institution_name: sup.institution_name ? sup.institution_name : '',
          supporter_name: sup.supporter_name ? sup.supporter_name : '',
        },
        contact: new ContactData(sup).toFormString(),
      });
      this.editSupporterModal.show();
    } else {
      // TODO: handle error
    }

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
  public deleteSupporter(index: number) {
    this.selectedForDeletion = index;
    this.confirmDeleteItemModal.show();
  }

  /**
   * deletion confirmed -> delete selection and update incident
   */
  public deleteConfirmed() {
    if (this.selectedForDeletion != undefined && this.item.supporter_list && this.item.supporter_list.length > this.selectedForDeletion){
      this.item.supporter_list.splice(this.selectedForDeletion, 1);
      this.selectedForDeletion = undefined;
      this.items.itemChanged(this.item);
    } else {
      // TODO: handle error
    }
    this.confirmDeleteItemModal.hide();
  }
}
