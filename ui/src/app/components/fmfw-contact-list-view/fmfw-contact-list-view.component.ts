import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'fmfw-contact-list-view',
  templateUrl: './fmfw-contact-list-view.component.html',
  styleUrls: ['./fmfw-contact-list-view.component.css']
})
export class FMFWContactListViewComponent implements OnInit {

  @Input() context: any;

  constructor() { }

  ngOnInit() {
  }

}
