import {Component, Input} from '@angular/core';

@Component({
  selector: 'fmfw-summary-header',
  templateUrl: './fmfw-summary-header.component.html',
  styleUrls: ['./fmfw-summary-header.component.css']
})
export class FmfwSummaryHeaderComponent {

  @Input() label: string;
  @Input() labelsuffix: string;
  @Input() class: string = 'table-area-header';

  constructor() { }

  getClass() {
    const objClass = {};
    objClass[this.class] = true;
    return objClass;
  }
}
