import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ItemsService} from '../../services/items/items.service';
import {Item} from '../../services/items/incident';
import {ActivatedRoute, Router} from '@angular/router';
import {SpinnerService} from "../../../services/spinner/spinner.service";
import {LoggingService} from "../../../services/logging/logging.service";
import {ToastrService} from "ngx-toastr";
import {ValueListService} from "../../services/value-lists/value-list.service";
import {ModalDirective} from "ngx-bootstrap";
import {ConfigService} from "../../../services/config/config.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-item-footer',
  templateUrl: './item-footer.component.html',
  styleUrls: ['./item-footer.component.css']
})
export class ItemFooterComponent implements OnInit, OnDestroy {
  @ViewChild('infoSavingUnsuccessfulModal', {static: false}) infoSavingUnsuccessfulModal: ModalDirective;
  @ViewChild('infoConfirmDiscardChangesModal', {static: false}) infoConfirmDiscardChangesModal: ModalDirective;

  item: Item;
  itemHasUnsavedChanges = false;
  incidentTypes:Map<string, any>;
  consultant: string;
  institution: string;
  dateFormat: string;

  constructor(
    private itemService: ItemsService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: SpinnerService,
    private logger: LoggingService,
    private toastr: ToastrService,
    private valueLists: ValueListService,
    private config: ConfigService,
  ) { }

  subscr: Subscription;
  subscr2: Subscription;
  subscr3: Subscription;
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
    this.subscr = this.itemService.observableItem.subscribe(item => this.item = item );
    this.subscr2 = this.itemService.itemHasUnsavedChanges.subscribe(res => this.itemHasUnsavedChanges = res );
    this.subscr3 = this.valueLists.getValueListAsMap('incident_type').subscribe(res =>this.incidentTypes = res );
    this.dateFormat = this.config.getString("DATE_FORMAT");
  }

  private saveItem() {
    return this.itemService.updateItem(this.item);
  }

  /**
   * save item
   * IF successful returm to dashboard
   * IF NOT successful user gets informed in a dialog
   */
  public save(backToDashboard:boolean) {
    // activate spinner while saving
    this.spinner.open();
    const subscrTemp: Subscription = this.saveItem().subscribe(
      resp => {
        this.spinner.close();
        // inform user in toastr
        this.toastr.info("Vorgang wurde gespeichert");
        // deactivate save buttons
        this.itemHasUnsavedChanges = false;
        subscrTemp.unsubscribe();
        // if backToDashboard flag is set, close incident and return to dashboard
        if (backToDashboard) this.backToDashboard();
      },
      msg => {
        this.spinner.close();
        this.inform_saveItemUnsuccessful(msg);
      }
    );
  }

  public close() {
    if (this.itemHasUnsavedChanges) {
      this.save(true);
    } else {
      this.backToDashboard();
    }
  }

  /**
   * ask for user confirmation to discard changes
   */
  public discardChanges() {
    this.ask4Confirmation_discardChanges();
  }

  /**
   * open dashboard route
   */
  backToDashboard() {
    // go back to dashboard
    this.router.navigate(['/items']);
  }

  /**
   * save new item on server
   * IF successful the fully created new item is returned and opened
   * IF NOT successful user gets informed in a dialog, can try again or return
   */
  public createItem() {
    // activate spinner while saving
    this.spinner.open();

    const subscrTemp: Subscription = this.itemService.createItem(this.item)
      .subscribe((item: Item) => {
          this.spinner.close();
          this.logger.debug(`New item with id {$item.id} created`);
          subscrTemp.unsubscribe();
          this.router.navigate(['../', item.id, item.type], { relativeTo: this.route });
      },
        msg => {
          this.spinner.close();
          subscrTemp.unsubscribe();
          this.inform_saveItemUnsuccessful(msg);
        } );
  }

  public consultantStr(): string {
    if (!this.consultant) {
      if (!this.item || !this.item.metadata || !this.item.metadata.consultant) {
        return '';
      }
      this.consultant = this.item.metadata.consultant;
    }
    return this.consultant;
  }

  public institutionStr(): string {
    if (!this.institution) {
      if (!this.item || !this.item.metadata || !this.item.metadata.institution) {
        return '';
      }
      this.institution = this.item.metadata.institution;
    }
    return this.institution;
  }

  //////// Error Handling  /////////

  /**
   * user confirmation: discard changes
   */
  ask4Confirmation_discardChanges() {
    this.infoConfirmDiscardChangesModal.show();
  }
  discardChangesConfirmed() {
    // inform user in toastr
    this.toastr.warning("Änderungen wurden verworfen");
    this.backToDashboard();
  }

  /**
   * user information: save item not successful
   */
  error_msg:string;
  create = false;
  cleanup() {
    this.error_msg = undefined;
    this.create = false;
  }

  inform_saveItemUnsuccessful(msg: any, create?: boolean) {
    // error_msg and create flag will be set to undefined in closeModal
    this.error_msg = msg.message;
    if (create) this.create = create;
    this.infoSavingUnsuccessfulModal.show();
  }
  tryAgain2SaveItem() {
    const createFlag = this.create;
    this.infoSavingUnsuccessfulModal.hide();
    this.cleanup();
    if (createFlag) this.createItem();
    else this.save(true);
  }

}
