import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../../../services/items/incident";
import {Causer} from "../../../../../../services/items/causer";
import {CauserType} from "../../../../../../services/items/causer-type";

@Component({
  selector: 'fmfw-summary-causer',
  templateUrl: './summary-causer.component.html',
  styleUrls: ['./summary-causer.component.css']
})
export class SummaryCauserComponent implements OnInit {

  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }

  public getCauserTypeFor(causer: Causer): CauserType {
    if (causer && causer.id) {
      if (this.item && this.item.incident_typology && this.item.incident_typology.causer_typology) {
        const causer_type_list = this.item.incident_typology.causer_typology;
        const found = causer_type_list.filter(ct => ct.causer_id === causer.id);
        if (found && found.length > 0) {
          return found[0];
        }
      }
    }
    return undefined;
  }
}
