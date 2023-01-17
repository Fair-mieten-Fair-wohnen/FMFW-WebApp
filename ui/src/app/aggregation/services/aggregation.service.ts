import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {TimeOfDataDump} from "./time-of-data-dump";
import {
  COMPLEX_AGGREGATION_DATA,
  SIMPLE_AGGREGATION_DATA
} from "../../../test/test-data";
import {AggregationType} from "./aggregation-type";
import {AggregationData} from "./aggregation-data";
import {catchError, map} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

export const AGGREGATION_SCOPES = {
  INTERNAL: 'fmfw_fachstelle',
  ALL: 'all'
};

@Injectable({
  providedIn: 'root'
})
export class AggregationService {

  url = environment.serverUrl + environment.apiPrefix;
  private _storedData = {};
  private aggregationTypes: Map<string, AggregationType>;
  private timesOfDataDumps: Map<string, Map<string, TimeOfDataDump>> = new Map<string, Map<string, TimeOfDataDump>>();
  private archiveJobsUrl = this.url + 'stats/archivejobs';  // URL to web api to access whole list of archive jobs
  private aggregationTypesUrl = this.url + 'stats/aggregationtypes';  // URL to web api to access whole list of aggregation types
  private aggregationUrl = this.url + 'stats/aggregation';  // URL to web api to access whole list of aggregation types

  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * returns a list of all times at which the aggregation data was drawn
   */
  public getAllTimesOfDataDumps(aggScope: string = AGGREGATION_SCOPES.ALL, maxLength = 240): Observable<TimeOfDataDump[]> {
    if (this.timesOfDataDumps.get(aggScope)) {
      return of(
        this.prepareList(
          Array.from(this.timesOfDataDumps.get(aggScope).values()),
          maxLength));
    } else {
      const url = `${this.archiveJobsUrl}/${aggScope}`;
      return this.http.get<any[]>(url)
        .pipe(
          map(resp => {
            this.timesOfDataDumps.set(
              aggScope,
              new Map<string, TimeOfDataDump>(
                resp.map(time => [time.id.toString(), new TimeOfDataDump(time)])));
            return this.prepareList(
              Array.from(this.timesOfDataDumps.get(aggScope).values()),
              maxLength);
          }),
          catchError(this.handleError(`getAllTimesOfDataDumps`, []))
        );
    }
  }

  public getTimeOfDataDump(timeId: string, aggScope: string): Observable<TimeOfDataDump> {
    if (!this.timesOfDataDumps.get(aggScope)) {
      return this.getAllTimesOfDataDumps(aggScope).pipe(
        map(times => {
          const found = times.filter(time => time.id === timeId);
          if (found) {
            return found[0];
          }
        })
      );
    } else {
      return of(this.timesOfDataDumps.get(aggScope).get(timeId));
    }
  }

  /**
   * returns a list of all available aggregation types
   */
  public getAllAggregationTypes(): Observable<AggregationType[]> {

    if (this.aggregationTypes) {
      return of(Array.from(this.aggregationTypes.values()));
    } else {
      return this.http.get<any[]>(this.aggregationTypesUrl)
        .pipe(
          map(resp => {
            this.aggregationTypes = new Map<string, AggregationType>(
              resp.map(type => [type.id, new AggregationType(type)])
            );
            return Array.from(this.aggregationTypes.values());
          }),
          catchError(this.handleError(`getAllAggregationTypes`, []))
        );
    }
  }

  public getAggregationType(aggregationId: string): Observable<AggregationType> {
    if (!this.aggregationTypes) {
      return this.getAllAggregationTypes().pipe(
        map(types => {
          const found = types.filter(type => type.id === aggregationId);
          if (found) {
            return found[0];
          }
        })
      );
    } else {
      return of(this.aggregationTypes.get(aggregationId));
    }
  }

  public getAggregationData(aggregationId: string, jobid: string): Observable<AggregationData> {

    if (aggregationId && jobid) {
      const url = `${this.aggregationUrl}/${aggregationId}/jobid/${jobid}`;

      return this.http.get<AggregationData>(url);

    }
    return undefined;

  }


  /**
   * persist aggregation data so that insertion is still displayed after tab changes
   * @param key
   */
  public getStoredData(key: string, defaultValue?: any): any {
    return (this._storedData[key] && this._storedData[key] !== null) ? this._storedData[key] : defaultValue !== undefined ? defaultValue : undefined;
  }

  /**
   * persist aggregation data so that insertion is still displayed after tab changes
   * @param key
   */
  public setStoredData(key: string, value: any): any {
    this._storedData[key] = value === '' ? undefined : value;
  }

  private prepareList(listP: TimeOfDataDump[], lengthP: number): TimeOfDataDump[] {
   return this.cropList(this.sortList(listP), lengthP);
  }

  private sortList(listP: TimeOfDataDump[]): TimeOfDataDump[] {
    const sortedList = listP.sort((t1, t2) =>
      t1.timestamp < t2.timestamp ?
        1 : t1.timestamp > t2.timestamp ? -1 : 0);
    return sortedList;
  }

  private cropList(listP: TimeOfDataDump[], lengthP: number): TimeOfDataDump[] {
    if (listP.length <= lengthP) {
      return listP;
    } else {
      const croppedList = listP.slice(0,lengthP);
      console.log(
        `Copped aggregation timestamp list to ${lengthP} elements. Oldest timestamp: ${croppedList[0].timestamp}`);
      return croppedList;
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
