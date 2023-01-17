import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "../../../../services/config/config.service";
import {Item} from "../../../services/items/incident";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemsService} from "../../../services/items/items.service";
import {ValueListService} from "../../../services/value-lists/value-list.service";
import {GeneralUtilsService} from "../../../services/utils/general-utils.service";
import {ContactData} from "../../../services/items/contact-data";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit, OnDestroy {

  item: Item;

  incidentAffectedPersonDataForm: FormGroup;

  headingId = 'person';
  heading:string;

  constructor(
    private config: ConfigService,
    private items: ItemsService,
    private valueList: ValueListService,
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
    this.incidentAffectedPersonDataForm = this.fb.group({
      lastname: [''],
      firstname: [''],
      affected_group: this.fb.group( {
        selected: [''],
        others: ['']
      }),
      number_of_children: [''],
      contact: this.fb.group({
        address: this.fb.group({
          street: [''],
          number: [''],
          city: [''],
          zip: ['', [Validators.pattern(/^[\d]{5,5}$/)]],
        }),
        email: ['', Validators.pattern(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)],
        phone: ['', [Validators.pattern(/^[\d()\-\_#\ \+]{4,}$/)]]
      }),
      gender: [''],
      age: [''],
      funding_letigation_costs: this.fb.group( {
        selected: [''],
        others: ['']
      })
    });

    this.subscr = this.items.getCurrentLoadedItem().subscribe(
      item => this.initItem(item)
    );

    if (!this.item || !this.item.affected_person) {
      this.incidentAffectedPersonDataForm.setValue({
        lastname: '',
        firstname: '',
        affected_group: {
        selected: '',
          others: ''
        },
        number_of_children: '',
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
        gender: '',
        age: '',
        funding_letigation_costs: {
          selected: '',
          others: ''
        }
      })
    }

    this.heading = this.config.getTabLabelForId(this.headingId);

    this.onChanges();
  }

  private initItem(item: Item) {
    this.item = item;
    if (this.item && this.item.affected_person) {
      const user = this.item.affected_person;
      this.incidentAffectedPersonDataForm.setValue({
        lastname: user.lastname ? user.lastname : '',
        firstname: user.firstname ? user.firstname : '',
        affected_group: this.utils.uniteSelectedAndOthers(user,'affected_group'),
        number_of_children: this.item.affected_person.number_of_children ? this.item.affected_person.number_of_children : '',
        contact: {
          address: {
            street: user.address && user.address.street ? user.address.street : '',
            number: user.address && user.address.number ? user.address.number : '',
            city: user.address && user.address.city ? user.address.city : '',
            zip: user.address && user.address.zip ? user.address.zip : ''
          },
          email: user.email ? user.email : '',
          phone: user.phone ? user.phone : ''
        },
        gender: user.gender ? user.gender : '',
        age: user.age ? user.age : '',
        funding_letigation_costs: this.utils.uniteSelectedAndOthers(user,'funding_letigation_costs')
      });
    }
  }

  /**
   * emit item changes to itemsService -> changes are stored locally and 'changed' flag is set to e.g. activate save button in footer
   */
  onChanges(): void {
    this.subscr2 = this.incidentAffectedPersonDataForm.valueChanges.subscribe(value => {

      this.item.affected_person = value;

      const contact = new ContactData(value.contact);
      if (contact) {
        contact.addTo(this.item.affected_person);
      }
      this.item.affected_person = this.utils.extractSelectedAndOthers(
        value.affected_group,
        'affected_group',
        value);
      this.item.affected_person = this.utils.extractSelectedAndOthers(
        value.funding_letigation_costs,
        'funding_letigation_costs',
        value);
      this.items.itemChanged(this.item);
    });
  }
}
