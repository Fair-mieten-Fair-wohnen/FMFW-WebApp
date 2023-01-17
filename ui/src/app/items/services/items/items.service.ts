import { Injectable } from '@angular/core';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Item} from './incident';
import {ItemStub} from './incident-stub';
import {TableCols} from '../table-cols';
import {ErrorHandlerService} from "../../../services/error-handling/error-handler.service";
import {LoggingService} from "../../../services/logging/logging.service";
import {environment} from "../../../../environments/environment";
import {ConfigService} from "../../../services/config/config.service";
import * as moment from 'moment';
import {IncidentWrapper} from "./incident-wrapper";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  url = environment.serverUrl + environment.apiPrefix;

  private itemsUrl = this.url + 'incident';  // URL to web api to access whole items
  private itemStubsUrl = this.url + 'incidents/stubs';  // URL to web api to access a list of itemStubs for lists
  private colNames = this.url + 'incidents/column-names';  // URL to web api to get list column name as returned by ITEM_STUBS endpoint
  private searchItemsUrl = this.url + 'incidents/search';  // URL to web api to send a search string to INCIDENT/SEARCH endpoint

  private itemList: ItemStub[] = [];
  private itemListCols: TableCols[] = [];

  private item: Item;
  private itemLoading: Observable<Item>;
  private behaviorSubItem = new BehaviorSubject<Item>(this.item);
  public observableItem: Observable<Item> = this.behaviorSubItem.asObservable();

  private changedFlagStruct = false;
  private behaviorSubChangedFlag = new BehaviorSubject<boolean>(this.changedFlagStruct);
  public itemHasUnsavedChanges: Observable<boolean> = this.behaviorSubChangedFlag.asObservable();

  private _access_rights: string[];

  defaultPageSize: number = 100;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private logger: LoggingService,
    private config: ConfigService,
  ) { }

  /**
   * Get all column names for dashboard incident list
   */
  public getDashboardColumnNames(): Observable<TableCols[]> {
    if (this.itemListCols.length > 0) {
      return of(this.itemListCols);
    }
    return this.http.get<TableCols[]>(this.colNames)
      .pipe(
        tap(cols => {
          this.logger.debug('Names for Columns of ItemsList fetched');
          this.itemListCols = cols;
        }),
        catchError(this.errorHandler.handleError('getDashboardColumnNames', []))
      );
  }

  /**
   * Get stubs of all items for dashboard incident list, contain only the required information for the given columns
   */
  public getAllItemStubs(): Observable<ItemStub[]> {
    if (this.itemList.length > 0) {
      return of(this.itemList);
    }
    return this.reloadItemStubs();
  }

  public reloadItemStubs(pageNum?: number, pageSize?: number): Observable<ItemStub[]> {
    const url = this.addParamsToURL(
      this.itemStubsUrl,
      pageNum,
      pageSize);

    return this.http.get<ItemStub[]>(url)
      .pipe(
        tap(items => this.logger.debug('Incident fetched')),
        catchError(this.errorHandler.handleError('getItems', []))
      );
  }

  /**
   * sets item in local param, actualize in observable item and changedFlag
   * @param newItem changed new item
   * @param changeFLag is the new item changed -> e.g. to activate save button in footer
   */
  private handleItemUpdate(newItem: Item, changeFLag: boolean) {
    this.item = newItem;
    this.behaviorSubItem.next(newItem);
    this.behaviorSubChangedFlag.next(changeFLag);
  }

  /**
   * clear item data with a new empty item - for creation process
   */
  public unloadItem(): Item {
    const item = new Item({ type: 'ALLG_BERATUNG'});
    this.handleItemUpdate(item, true);
    return this.item;
  }

  /**
   * Load item with id from database server
   * observe ItemService.item to get updates from this item, loaded from database here
   * @param id from item to be fetched from db
   */
  public createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, httpOptions)
      .pipe(
        tap((newItem: Item) => {
          // TODO: check if metadata and incident_number exist, else -> throw error
          this.logger.debug(`Item with id ${newItem.id} created in db, name is ` + newItem.metadata.incident_number);
          this.handleItemUpdate(newItem, true);
        }),
        catchError(this.errorHandler.handleError('createItem', item))
      );
  }

  /**
   * Load item with id from database server
   * observe ItemService.item to get updates from this item, loaded from database here
   * @param id from item to be fetched from db
   */
  public loadItem(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    this.itemLoading = this.http.get<IncidentWrapper>(url)
      .pipe(
        tap((val: IncidentWrapper) => {
          this.logger.debug(`Item with id ${id} loaded, name is ${val.incident.metadata.incident_number}`);
          this.handleItemUpdate(new Item(val.incident), false);
          this.access_rights = val.access_rights;
        }),
        map(val => val.incident),
        catchError(this.errorHandler.handleError('getItem', null))
      );
    return this.itemLoading;
  }

  /**
   * call this function from one of the tab pages
   * => item has been loaded in item-loading component before redirected to the initial tab page
   * TODO: check if item loading is pending
   * TODO: error handling!!!!!
   */
  public getCurrentLoadedItem(): Observable<Item> {
    if (this.item) return of(this.item);
    else return this.itemLoading.pipe(
      map(item => new Item(item)));
  }

  public set access_rights(access_rights: string[]){
    this._access_rights = access_rights;
  }

  public get access_rights(): string[] {
    return this._access_rights;
  }

  /**
   * update item with changes from forms and set 'changed' flag to mark it to be different from db version
   * @param item updated item
   */
  public itemChanged(item: Item) {
    this.handleItemUpdate(item, true);
  }
  /**
   * PUT: update item on the server
   * @param item
   */
  public updateItem (item: Item): Observable<Item> {
    const url = `${this.itemsUrl}/${this.item.id}`;
    const curItem = this.behaviorSubItem.getValue() as Item;
    this.logger.debug('behaviorSubItem.getValue type: ' + curItem.constructor.name);
    return this.http.put<Item>(url, curItem, httpOptions)
      .pipe(
        tap(updatedItem => {
          if (updatedItem != null) {
            this.handleItemUpdate(updatedItem, false);
          }
          this.logger.debug(`updated item id=${item.id}`);
        }),
        catchError(this.errorHandler.handleError<any>('updateItem'))
      );
  }

  /**
   * search items that match to filter string, the whole incident is checked,
   * TODO(BE): currently also field names match
   * @param searchStr string of at least 3 letters
   */
  public searchItems (searchStr: string, pageNum?: number, pageSize?: number ): Observable<ItemStub[]> {
    const url = this.addParamsToURL(
      `${this.searchItemsUrl}/${searchStr}`,
      pageNum,
      pageSize);

    return this.http.get<ItemStub[]>(url)
      .pipe(
        tap(_ => this.logger.debug(`Incidents founds for searchString ${searchStr}`)),
        catchError(this.errorHandler.handleError('getItems', []))
      );
  }

  /**
   * returns an empty structure with incident date and generated dates
   */
  public createEmptyDatesStructure(): any {
    return { // cleanup
      incident_date: null,
      generated_dates: {
        complaint_until_date: null,
        legal_action_until_date: null,
        criminal_application_until_date: null
      }
    };
  }

  /**
   * when a new incident_date is set, deadlines for complaint, legal action and criminal application have to be
   * calculated and the item has to be updated and propagated back to the form
   * @param val incident_date value set in form
   * Returns the updated item
   */
  public calculateDeadlinesFromIncidentDate(val:any): any {
    // cleanup
    let calc_dates = this.createEmptyDatesStructure();

    if (val) {
      calc_dates.incident_date = val;

      const base = new Date(val);

      const deadlines = this.config.getString("LAWSUIT_DEADLINES");
      if (deadlines){
        // calculate dates
        calc_dates.generated_dates.complaint_until_date = deadlines['COMPLAINT_RANGE'] ? this.addRangeToISOString(base,deadlines['COMPLAINT_RANGE']) : null;
        calc_dates.generated_dates.legal_action_until_date = deadlines['LEGAL_ACTION_RANGE'] ? this.addRangeToISOString(base,deadlines['LEGAL_ACTION_RANGE']) : null;
        calc_dates.generated_dates.criminal_application_until_date = deadlines['CRIMINAL_APPLICATION_RANGE'] ? this.addRangeToISOString(base,deadlines['CRIMINAL_APPLICATION_RANGE']) : null;
      }
    }

    return calc_dates;
  }

  /**
   * adds a range of tile to the given date
   * range is formated in moments format, e.g. {"months": 4}, {"years": 2}, {"years": 2, "months": 6}
   * @param incidentDate
   * @param range2add
   */
  private addRange(incidentDate: Date, range2add: any): Date {
    if (range2add) {
      return moment(incidentDate).add(range2add).toDate();
    }
    return incidentDate;
  }

  private addRangeToISOString(incidentDate: Date, range2add: any): String {
     return this.addRange(incidentDate, range2add).toISOString();
  }

  private addParamsToURL(url: string, pageNum: number, pageSize: number): string {
    if (pageNum !== undefined && pageNum > 0) {

      // inizialize pageSize if not defined by paginator
      if (pageSize === undefined)
        pageSize = this.defaultPageSize;

      // calc first item index from pageNum
      const startNum = (pageNum * pageSize) - pageSize;

      url += `/from/${startNum}/maxrows/${pageSize}`;
    }
    return url;

  }
}
