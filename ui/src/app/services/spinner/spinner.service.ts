import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private modal: any;

  set(modal: any) {
    // add modal to array of active modals
    this.modal = modal;
  }

  remove() {
    // remove modal from array of active modals
    this.modal = undefined;
  }

  open() {
    // open spinner modal
    if (!this.modal) console.error('No spinner modal defined!');
    else this.modal.open();
  }

  close() {
    // close spinner modal
    if (!this.modal) console.error('No spinner modal defined!');
    else this.modal.close();
  }
}
