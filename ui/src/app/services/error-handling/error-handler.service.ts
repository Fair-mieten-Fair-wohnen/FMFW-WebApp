import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {LoggingService} from "../logging/logging.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private logger: LoggingService,
    private toastr: ToastrService
  ) { }

  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.logger.error(error.message); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.logger.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public handleWarning<T> (operation = 'operation', result?: T) {
    return (warning: any): Observable<T> => {

      this.logger.warn(warning); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.logger.log(`Warning occurred at ${operation}: ${warning.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public informUserErrorUccurred(msg: string) {
    this.logger.error(msg); // log to console
    this.toastr.error('Es ist ein Fehler aufgetreten: ' + msg);
  }
}
