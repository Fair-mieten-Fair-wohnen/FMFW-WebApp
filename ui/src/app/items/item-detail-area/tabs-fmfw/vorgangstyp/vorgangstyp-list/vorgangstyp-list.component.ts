import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Item} from '../../../../services/items/incident';
import {ValueListService} from "../../../../services/value-lists/value-list.service";
import {ValueListItem} from "../../../../services/value-lists/value-list-item";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ItemsService} from "../../../../services/items/items.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalDirective} from "ngx-bootstrap";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-vorgangstyp-list',
  templateUrl: './vorgangstyp-list.component.html',
  styleUrls: ['./vorgangstyp-list.component.css']
})
export class VorgangstypListComponent implements OnInit, OnDestroy {
  @ViewChild('infoSaveToChangeTypeModal', {static: false}) infoSaveToChangeTypeModal: ModalDirective;

  @Input() item: Item;

  public types: ValueListItem[] = [];
  vorgangstypForm: FormGroup;
  selectedType: string;
  downgrade: boolean;

  constructor(
    private valueList: ValueListService,
    private fb: FormBuilder,
    private itemService: ItemsService,
    private router: Router,
    private route: ActivatedRoute,
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
    this.subscr = this.valueList.getValueList('incident_type').subscribe(
      list => this.types = list );

    this.vorgangstypForm = this.fb.group({
      incidentType: [this.item.type]
    });
  }

  public checkSelection(selectedType: string) {
    if (!this.item.id) {
      // creation mode -> every change is allowed
      this.item.type = selectedType;
    } else {
      switch (this.item.type) {
        case "ALLG_BERATUNG":
          // ask user because we have to save
          this.selectedType = selectedType;
          this.ask4Confirmation_upgrade();
          break;
        case "MELDUNG":
          if (selectedType == 'FALLBETREUUNG') {
            // ask user because we have to save
            this.selectedType = selectedType;
            this.ask4Confirmation_upgrade();
            break;
          }
        // elso go on with downgrade, as it always would be the situation for FALLBETREUUNG
        case "FALLBETREUUNG":
          // downgrade has to be allowed by user
          this.selectedType = selectedType;
          this.ask4Confirmation_downgrade();
          break;
      }
    }
  }

  //////// Error Handling  /////////

  /**
   * user confirmation: downgrade incident type
   */
  ask4Confirmation_downgrade() {
    this.downgrade = true;
    this.infoSaveToChangeTypeModal.show();
  }

  /**
   * user confirmation: downgrade incident type
   */
  ask4Confirmation_upgrade() {
    this.downgrade = false;
    this.infoSaveToChangeTypeModal.show();
  }

  /**
   * Cancel
   */
  cancel(){
    this.infoSaveToChangeTypeModal.hide();
    // reset selection to item.type
    this.vorgangstypForm.patchValue({
      incidentType: this.item.type
    });
  }

  /**
   * confirm
   */
  changeIncidentType() {
    this.infoSaveToChangeTypeModal.hide();
    // set new selected item type and update item
    this.item.type = this.selectedType;
    this.subscr2 = this.itemService.updateItem(this.item).subscribe(
      // we have to change the route because the icident type is part of it
      _ => this.router.navigate(['../../', this.item.type, 'vorgangstyp'], { relativeTo: this.route })
  )
    // TODO: error handling (see footer component)
  }




}
