import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ItemStub} from '../services/items/incident-stub';
import {ItemsService} from '../services/items/items.service';
import {TableCols} from '../services/table-cols';
import {ValueListService} from "../services/value-lists/value-list.service";
import {formatDate} from "@angular/common";
import {ConfigService} from "../../services/config/config.service";
import {ModalDirective} from "ngx-bootstrap";
import {ToastrService} from "ngx-toastr";
import {LoggingService} from "../../services/logging/logging.service";
import {FilterService} from "../services/items/filter.service";
import {Subscription, interval, Observable, forkJoin} from "rxjs";
import {environment} from "../../../environments/environment";
import {startWith, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {
  @ViewChild('confirmDeleteItemModal', {static: false}) confirmDeleteItemModal: ModalDirective;

  polling = new Subscription();

  /**
   * If searchStr is set, the search is activated and pagination deactivated!!
   */
  searchStr: string;

  tableCols: TableCols[] = [];
  items: ItemStub[] = [];
  incidentTypes:Map<string, any>;
  responsibleInstitution:Map<string, any>;
  accessList = {};

  // pagination params
  totalItems:number;
  itemsPerPage:number;
  maxSize:number;
  currentPage:number;
  currentPageSize:number;
  searchInitString:string;
  lastSelectedItemId:number;


  constructor(
    private itemService: ItemsService,
    private valueLists: ValueListService,
    private config: ConfigService,
    private toastr: ToastrService,
    private logger: LoggingService,
    private filterService: FilterService
  ) {
  }

  public valueListsLoaded = false;
  subscr: Subscription;
  ngOnInit() {
    const observableList: Observable<any>[] = [];

    // load valueLists
    observableList.push(this.itemService.getDashboardColumnNames());
    observableList.push(this.loadMap('incident_type', 'incidentTypes'));
    observableList.push(this.loadMap('responsible_institution', 'responsibleInstitution'));

    // wait until all valueLists are loaded
    this.subscr = forkJoin(observableList).subscribe(results => {
      this.tableCols = results[0];
      this.valueListsLoaded = true;
    });

    this.itemsPerPage = this.config.getNumber("LIST_ITEMS_PER_PAGE") || 10;
    this.maxSize = this.config.getNumber("MAX_NUM_OF_PAGE_NUMS_LISTED") || 15;
    this.currentPage = this.filterService.currentPage;
    this.currentPageSize = this.itemsPerPage;

    this.searchInitString = this.filterService.currentSearch;
    this.lastSelectedItemId = this.filterService.lastSelectedItemId;

  }

  private loadMap(mapName: string, saveTo: string) {
    return this.valueLists.getValueListAsMap(mapName).pipe(
      tap(list => this[saveTo] = list)
      // TODO: error handling
    );
  }

  ngOnDestroy() {
    this.stopPolling();
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }
  private restartPolling() {
    this.stopPolling();

    this.polling = interval(environment.POLLING_INTERVAL_MILLISECONDS)
      .pipe(
        startWith(0),
        switchMap(() => {
          if (this.searchActive()) {
            return this.itemService.searchItems(
              this.searchStr,
              this.currentPage,
              this.itemsPerPage
            );
          } else {
            return this.itemService.reloadItemStubs(
              this.currentPage,
              this.itemsPerPage
            );
          }
        })
      )
      .subscribe(
        items => {
          this.updateListWithSearchResult(items);
        },
        error => {
          console.log("Error occurred: " + error);
        }
      );
  }

  private stopPolling() {
    if (this.polling) {
      this.polling.unsubscribe();
    }
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.filterService.currentPage = this.currentPage;
    this.restartPolling();
  }

  searchChanged(searchStr: any) {
    let newSearch:string;
    if (searchStr && searchStr.trim() !== '') {
      newSearch = searchStr.trim();
    }
    if (newSearch !== this.searchStr) {
      this.resetPagination();
    }
    this.searchStr = newSearch;

    this.filterService.currentSearch = this.searchStr;
    this.restartPolling();
  }

  resetPagination() {
    this.filterService.currentPage = 1;
    this.currentPage = this.filterService.currentPage;
  }

  searchActive(): boolean {
    return this.searchStr && this.searchStr.trim().length > 0;
  }

  itemParamToString(item: ItemStub, column: TableCols) {
    switch (column.type) {
      case 'string':
        return item[column.ref];
      case 'institution-with-other':
        return this.responsibleInstitution[item[column.ref]] ? this.responsibleInstitution[item[column.ref]].label : '';
      case 'date':
        return item[column.ref] ?
          formatDate(item[column.ref], this.config.getString("DATE_FORMAT"), "de-DE") :
          "-";
      case 'type':
        return this.incidentTypes[item[column.ref]] ? this.incidentTypes[item[column.ref]].label : '';
      case 'icon-list':
        break;
      default:
        return "(not available)";
    }
  }

  updateListWithSearchResult(foundItems: ItemStub[]) {
    this.items = foundItems;
    this.totalItems = (this.items && this.items.length > 0) ? this.items[0].totalItemsCount : 0;
    // Handle that search doesn't deliver items with pagination -> TODO: paginate searched items on server
    this.currentPageSize = this.items.length > this.itemsPerPage ?
      this.items.length : this.itemsPerPage;
  }

  public calcRowClass(item: ItemStub) {
    return parseInt(item.id) === this.lastSelectedItemId ? 'last-opened-item' : '';
  }

  //////// delete ///////////
  /**
   * remember selected index for after user confirmed deletion
   */
  private selectedForDeletion: ItemStub;

  /**
   * open confirm dialog
   * @param index: selected item
   */
  public delete(item: ItemStub) {
    this.selectedForDeletion = item;
    this.confirmDeleteItemModal.show();
  }

  /**
   * deletion confirmed -> delete selection and update incident
   */
  public deleteConfirmed() {
    if (this.selectedForDeletion != undefined){
      // TODO: send delete request
      this.toastr.warning("Vorgänge können noch nicht gelöscht werden (noch nicht implementiert...)");
    } else {
      this.toastr.error("Vorgang konnte nicht gelöscht werden (Fehler: es ist unklar, welcher Vorgang zum Löschen ausgewählt wurde)");
    }
    this.confirmDeleteItemModal.hide();
  }
}
