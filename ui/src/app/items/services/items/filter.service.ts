import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private  _currentPage: number;
  private  _currentSearch: string;
  private  _lastSelectedItemId: number;

  constructor() { }

  public  set currentPage(cp: number) {
    this._currentPage = cp;
  }

  public  get currentPage(): number {
    return this._currentPage || 1;
  }

  public  set lastSelectedItemId(lsii: number) {
    this._lastSelectedItemId = lsii;
  }

  public  get lastSelectedItemId(): number {
    return this._lastSelectedItemId;
  }

  public  set currentSearch(lsii: string) {
    this._currentSearch = lsii;
  }

  public  get currentSearch(): string {
    return this._currentSearch || '';
  }
}
