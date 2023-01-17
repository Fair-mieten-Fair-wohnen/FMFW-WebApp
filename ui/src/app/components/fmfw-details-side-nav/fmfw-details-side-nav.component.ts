import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ErrorHandlerService} from "../../services/error-handling/error-handler.service";
import {NavTab} from "./nav-tab";
import {ConfigService} from "../../services/config/config.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'fmfw-details-side-nav',
  templateUrl: './fmfw-details-side-nav.component.html',
  styleUrls: ['./fmfw-details-side-nav.component.css']
})
export class FmfwDetailsSideNavComponent implements OnInit, OnDestroy {

  public tabLabels: NavTab[] = [];
  public activeTab: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private config: ConfigService
  ) { }

  subscr: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }
  ngOnInit() {
    this.subscr = this.activatedRoute.data
      .subscribe(data => {
          if (data && data.active_tabs && data.active_area) {

            this.tabLabels = this.config.getNavTabs(data.active_area, data.active_tabs);

            this.activeTab = this.tabLabels.length > 0 ? this.tabLabels[0].id : '';

          } else {
            this.tabLabels = [];
          }
        },    // error handling: clear tabLabels and send warning to errorHandler
        msg => {
          this.tabLabels = [];
          this.errorHandler.handleWarning('ItemDetailSideNav-ActivatedRoute-GetData', null)
        }
      );
  }

}
