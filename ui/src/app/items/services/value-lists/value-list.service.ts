import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoggingService} from "../../../services/logging/logging.service";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {ValueListItem} from "./value-list-item";
import {HierarchicValueListItem} from "./hierarchic-value-list-item";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ValueListService {

  static valueLists = {};
  static valueMaps = {};

  constructor(
    private http: HttpClient,
    private logger: LoggingService
  ) { }

  /**
   * tries to fetch stored valueList with given name from local stored valueLists array;
   * if this value list isn't already stored, it's fetched from database and stored in a new item with the given
   * valueList name in the array; the url of the value list to be fetched ist stored in the local array valueListURLs
   * with the name of the value list (centralized for easier replacement of mock data with productive data)
   *
   * @param valueListName
   */
  public getValueList(valueListName: string): Observable<ValueListItem[]> {
    if (ValueListService.valueLists[valueListName] && ValueListService.valueLists[valueListName].length > 0) {
      return of(ValueListService.valueLists[valueListName]);
    } else {
      return this.http.get<ValueListItem[]>(environment.serverUrl + environment.apiPrefix + 'valuelists/' + valueListName)
        .pipe(
          tap(res => {
            this.logger.debug(`ValueList ${valueListName} fetched`);
            ValueListService.valueLists[valueListName] = res;
          }),
          catchError(this.handleError(`getValueList (${valueListName}):`, []))
        );
    }
  }

  public getValueListAsMap(valueListName: string): Observable<void | any> {
    if (ValueListService.valueMaps[valueListName]) {
      return of(ValueListService.valueMaps[valueListName]);
    } else {
      return this.http.get<any>(environment.serverUrl + environment.apiPrefix + 'valuelists/map/' + valueListName)
        .pipe(
          tap(res =>
            ValueListService.valueMaps[valueListName] = res),
          catchError(this.handleError(`getValueList (${valueListName}):`, []))
        );
    }
  }

  public getHierarchicalValueList(valueListName: string): Observable<HierarchicValueListItem[]> {
    if (ValueListService.valueLists[valueListName] && ValueListService.valueLists[valueListName].length > 0) {
      return of(ValueListService.valueLists[valueListName]);
    } else {
      return this.http.get<HierarchicValueListItem[]>(environment.serverUrl + environment.apiPrefix + 'valuelists/' + valueListName)
        .pipe(
          tap(res => {
            this.logger.debug(`ValueList ${valueListName} fetched`);
            ValueListService.valueLists[valueListName] = res;
          }),
          catchError(this.handleError(`getHierarchicalValueList (${valueListName}):`, []))
        );
    }
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // send the error to remote logging infrastructure
      this.logger.error(error.message);

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
