import {Component, OnInit} from '@angular/core';
import {BsLocaleService} from "ngx-bootstrap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private _localeService: BsLocaleService
  ) {
    this._localeService.use('de');
  }

  ngOnInit() {
    console.log("Version: 0.4.2")
  }

}
