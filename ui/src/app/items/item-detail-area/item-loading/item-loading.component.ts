import {Component, OnDestroy, OnInit} from '@angular/core';
import {ItemsService} from '../../services/items/items.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Item } from '../../services/items/incident';
import {LoggingService} from "../../../services/logging/logging.service";
import {SpinnerService} from "../../../services/spinner/spinner.service";
import {FilterService} from "../../services/items/filter.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-item-loading',
  templateUrl: './item-loading.component.html',
  styleUrls: ['./item-loading.component.css']
})
export class ItemLoadingComponent implements OnInit, OnDestroy {

  constructor(
    private itemService: ItemsService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: LoggingService,
    private spinner: SpinnerService,
    private filterService: FilterService
  ) { }

  subscr: Subscription;

  ngOnInit() {
    this.spinner.open();

    const id = this.route.snapshot.paramMap.get('id');
    this.logger.debug('Reload item for id: ' + id);

    this.subscr = this.itemService.loadItem(+id)
      .subscribe((incident: Item) => {
        this.spinner.close();

        this.filterService.lastSelectedItemId = incident.id;

        const access_rights = this.itemService.access_rights;

        if (access_rights && access_rights.includes('READ')){

          const pathParts = location.pathname.split('/');
          if (pathParts[0] == "") pathParts.splice(0,1);

          if(access_rights.includes('WRITE')) {
            if (pathParts.length >= 5) this.router.navigate(['./', pathParts[3], pathParts[4]], { relativeTo: this.route });
            else this.router.navigate(['./', incident.type], { relativeTo: this.route });
          }
          else {
            this.router.navigate(['./READONLY/', incident.type], { relativeTo: this.route });
          }
        }
        else this.router.navigate(['./access-denied']);
      },
        msg => {
        // TODO: itemService.loadItem - error handling!!
          // TODO: check which error occurred: 404, 500
          // error handling for 403, 401
          this.router.navigate(['./access-denied']);
        });
  }

  ngOnDestroy() {
    this.spinner.close();
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }
}
