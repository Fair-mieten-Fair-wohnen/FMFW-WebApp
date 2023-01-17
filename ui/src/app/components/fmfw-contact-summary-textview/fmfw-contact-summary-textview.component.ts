import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from "../../services/config/config.service";
import {ContactData} from "../../items/services/items/contact-data";

@Component({
  selector: 'fmfw-contact-textview',
  templateUrl: './fmfw-contact-summary-textview.component.html',
  styleUrls: ['./fmfw-contact-summary-textview.component.css']
})
export class FmfwContactSummaryTextviewComponent implements OnInit {

  _context: ContactData;
  @Input()
  set context(val: ContactData) {
    this._context = new ContactData(val);
  }

  @Input() notSetPlaceholder: string;   /** optional: set if different placeholder than config.NOT_SET_PLACEHOLDER
                                            should be displayed if nothing selected */

  constructor(
    private config: ConfigService
  ) { }

  ngOnInit() {
  }

  public address(): string {
    if (this._context && this._context.address){
      let val = this._context.address.toString();
      if (val.length > 0) {
        return val;
      }
    }
    return this.getDefaultPlaceholder();
  }

  private getDefaultPlaceholder(): string {
    if (!this.notSetPlaceholder) {
      this.notSetPlaceholder = this.config.getString('NOT_SET_PLACEHOLDER');
    }
    return this.notSetPlaceholder;
  }
}
