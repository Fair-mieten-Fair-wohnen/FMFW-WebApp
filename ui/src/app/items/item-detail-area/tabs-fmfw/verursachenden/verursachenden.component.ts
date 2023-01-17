import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from "../../../../services/config/config.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemsService} from "../../../services/items/items.service";
import {Item} from "../../../services/items/incident";
import {ModalDirective} from "ngx-bootstrap";
import {Causer} from "../../../services/items/causer";
import {oneFieldOfCollectionFilledValidator} from "../../../../utils/check-one-field-of-collection-filled.validator";
import {ContactData} from "../../../services/items/contact-data";
import {GeneralUtilsService} from "../../../services/utils/general-utils.service";
import {CauserType} from "../../../services/items/causer-type";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-verursachenden',
  templateUrl: './verursachenden.component.html',
  styleUrls: ['./verursachenden.component.css']
})
export class VerursachendenComponent implements OnInit, OnDestroy {
  @ViewChild('editCauserModal', {static: false}) editCauserModal: ModalDirective;
  @ViewChild('confirmDeleteItemModal', {static: false}) confirmDeleteItemModal: ModalDirective;

  item: Item;

  headingId = 'verursachenden';
  heading:string;

  editCauserForm: FormGroup;
  causerNameForm: FormGroup;
  contactForm: FormGroup;
  addressForm: FormGroup;
  causerTypologyForm: FormGroup;
  currentIndex = -1;

  constructor(
    private config: ConfigService,
    private items: ItemsService,
    private fb: FormBuilder,
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

    // preparing causerTypology Form
    this.causerTypologyForm = this.fb.group({
      causer_type: this.fb.group( {
        selected: [''],
        others: ['']
      }),
      owner_agency: this.fb.group( {
        selected: [''],
        others: ['']
      }),
      number_of_appartments: this.fb.group( {
        selected: [''],
        others: ['']
      })
    });

    this.causerNameForm = this.fb.group({
      company_institution_name: [''],
      causer_name: [''],
    },
      // { validators: [
      //   oneFieldOfCollectionFilledValidator(
      //     ['company_institution_name', 'causer_name'])
      // ]}
    );


    this.editCauserForm = this.fb.group({
      id: [''],
      names: this.causerNameForm,
      contact: this.contactForm,
      causer_type: this.causerTypologyForm,
    });

    this.clearInputs();

    this.subscr = this.items.getCurrentLoadedItem().subscribe(
      item => this.item = item
    );

    this.heading = this.config.getTabLabelForId(this.headingId);
  }

  public showDialog2AddCauser() {
    this.clearInputs();
    this.editCauserModal.show();
  }

  /**
   *  submit data from modal form -> create causer from data and update item
   */
  public onSubmit() {
    if (!this.item.causer_list) this.item["causer_list"] = [];

    const causer = this.addOrUpdateCauser(this.editCauserForm.value);
    this.addOrUpdateCauserTypology(this.causerTypologyForm.value, causer);


    this.items.itemChanged(this.item);
    this.editCauserModal.hide();
    this.clearInputs();
  }

  private addOrUpdateCauser(value: any): Causer {
    let causer = new Causer({
      id: value.id,
      company_institution_name: value.names.company_institution_name,
      causer_name: value.names.causer_name
    });

    const contact = new ContactData(value.contact);
    if (contact) {
      contact.addTo(causer);
    }

    if (this.currentIndex < 0) {
      if (!this.item.causer_list) {
        this.item.causer_list = [];
      }
      this.item.causer_list.push(causer);
    } else {
      this.item.causer_list[this.currentIndex] = causer;
    }

    return causer;
  }

  private addOrUpdateCauserTypology(value: any, causer: Causer) {
    if (value.causer_type && value.causer_type.selected && value.causer_type.selected.length > 0){
      let causerTypo = new CauserType( value, causer.id );

      let index = -1;
      if (!this.item.incident_typology) {
        this.item.incident_typology = {};
      }
      if (!this.item.incident_typology.causer_typology) {
        this.item.incident_typology.causer_typology = [];
      } else {
        if (causerTypo.causer_id && causerTypo.causer_id !== '') {
          index = this.item.incident_typology.causer_typology
            .map(ct => ct.causer_id)
            .indexOf(causerTypo.causer_id);
        }
      }

      if (index < 0) {
        this.item.incident_typology.causer_typology.push(causerTypo);
      } else {
        this.item.incident_typology.causer_typology[index] = causerTypo;
      }

    }
  }

  public clearInputs() {
    this.currentIndex = -1;
    this.editCauserForm.setValue({
      id: '',
      names: {
        company_institution_name: '',
        causer_name: '',
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
      },
      causer_type: {
        causer_type: {
          selected: '',
          others: ''
        },
        owner_agency: {
          selected: '',
          others: ''
        },
        number_of_appartments: {
          selected: '',
          others: ''
        }
      }
    });
  }

  public getCauserType(causer): CauserType {
    return this.getCauserTypeFromList(causer);
  }

  public editCauser(index: number) {
    if (this.item && this.item.causer_list && this.item.causer_list.length > index){
      const causer:Causer = this.item.causer_list[index];
      this.currentIndex = index;
      this.editCauserForm.setValue({
        id: causer.id,
        names: {
          company_institution_name: causer.company_institution_name ? causer.company_institution_name : '',
          causer_name: causer.causer_name ? causer.causer_name : '',
        },
        contact: new ContactData(causer).toFormString(),
        causer_type: this.getCauserTypeForm(causer)
      });
      this.editCauserModal.show();
    } else {
      // TODO: handle error
    }
  }

  private getCauserTypeFromList(causer: Causer): CauserType {
    if (causer && causer.id) {
      if (this.item && this.item.incident_typology && this.item.incident_typology.causer_typology) {
        const causer_type_list = this.item.incident_typology.causer_typology;
        const found = causer_type_list.filter(ct => ct.causer_id === causer.id);
        if (found && found.length > 0) {
          return found[0];
        }
      }
    }
    return undefined;
  }

  private getCauserTypeForm(causer: Causer): any {
    const ct = this.getCauserTypeFromList(causer);
    if (ct) {
      return {
        causer_type: this.utils.uniteSelectedAndOthers(ct,'causer_type'),
        owner_agency: this.utils.uniteSelectedAndOthers(ct,'owner_agency'),
        number_of_appartments: this.utils.uniteSelectedAndOthers(ct,'number_of_appartments')
      }
    }
    // else
    return {
      causer_type: {
        selected: '',
        others: ''
      },
      owner_agency: {
        selected: '',
        others: ''
      },
      number_of_appartments: {
        selected: '',
        others: ''
      }
    };
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
  public deleteCauser(index: number) {
    this.selectedForDeletion = index;
    this.confirmDeleteItemModal.show();
  }

  /**
   * deletion confirmed -> delete selection and update incident
   */
  public deleteConfirmed() {

      if (this.selectedForDeletion != undefined && this.item.causer_list && this.item.causer_list.length > this.selectedForDeletion){

        // also delete causer typology if set for this causer
        const causer = this.item.causer_list[this.selectedForDeletion];
        const ct = this.getCauserTypeFromList(causer);
        if (ct) {
          const index = this.item.incident_typology.causer_typology.indexOf(ct);
          if (index > -1) {
            this.item.incident_typology.causer_typology.splice(index, 1);
          }
        }

        this.item.causer_list.splice(this.selectedForDeletion, 1);
        this.selectedForDeletion = undefined;
        this.items.itemChanged(this.item);
      } else {
        // TODO: handle error
      }
      this.confirmDeleteItemModal.hide();
  }

}
