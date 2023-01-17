import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

export const ERROR = {
  GENERAL: "GENERAL"
};


@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  id = ERROR.GENERAL;
  errorCodes = ERROR;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.id = id;
  }

}
