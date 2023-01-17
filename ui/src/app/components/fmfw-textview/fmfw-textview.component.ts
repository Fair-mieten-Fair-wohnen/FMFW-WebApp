import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Item} from "../../items/services/items/incident";
import {ConfigService} from "../../services/config/config.service";

/**
 *  Component to display single item param in a textview (or checkbox) - for summary tab
 *
 *  You can output
 *  1. an item parameter by inserting the item AND paramPath (as dot separated path)
 *  2. OR a value directly by inserting fieldValue directly
 *
 * Template:
 *
 <fmfw-textview [item]="item" paramPath="" textFormat="{{TEXTVIEW_FORMATS.<FORMAT>}}"
 i18n-label=""
 label=""></fmfw-textview>

 */
export const TEXTVIEW_FORMATS = {
  TEXT: "TEXT",
  DATE: "DATE",
  CHECKBOX: "CHECKBOX",
  TEXTAREA: "TEXTAREA"
};

@Component({
  selector: 'fmfw-textview',
  templateUrl: './fmfw-textview.component.html',
  styleUrls: ['./fmfw-textview.component.css']
})
export class FmfwTextviewComponent implements OnInit {
  @ViewChild('TEXT', {static: true}) TEXT: TemplateRef<any>;
  @ViewChild('DATE', {static: true}) DATE: TemplateRef<any>;
  @ViewChild('CHECKBOX', {static: true}) CHECKBOX: TemplateRef<any>;
  @ViewChild('TEXTAREA', {static: true}) TEXTAREA: TemplateRef<any>;

  @Input() label: string;
  @Input() fieldValue: string;
  @Input() item: Item;
  @Input() paramPath: string;           /** dot separated path to the item parameter, in which the selection is saved,
                                            example: generaldata.contact_by */

  @Input() textFormat: string = TEXTVIEW_FORMATS.TEXT;  /** optional: set if not simple text,
                                                            allowed formats: constant TEXTVIEW_FORMATS */
  @Input() dateTimeFormat: string;
  @Input() rows: number = 10;

  @Input() notSetPlaceholder: string;   /** optional: set if different placeholder than config.NOT_SET_PLACEHOLDER
                                            should be displayed if nothing selected */


  constructor(
    private config: ConfigService
  ) { }

  ngOnInit() {
    if (this.textFormat === TEXTVIEW_FORMATS.DATE && !this.dateTimeFormat) {
      this.dateTimeFormat = this.config.getString('DATE_TIME_FORMAT');
    }

    if (this.item && this.paramPath) {
      const param = this.item.resolveParam(this.paramPath);
      this.fieldValue = param;
    }

    if (this.fieldValue === undefined) {
      if (this.textFormat === TEXTVIEW_FORMATS.TEXT || this.textFormat === TEXTVIEW_FORMATS.TEXTAREA) {
        this.fieldValue = this.getDefaultPlaceholder();
      }
    }
  }

  public getDefaultPlaceholder(): string {
    if (!this.notSetPlaceholder) {
      this.notSetPlaceholder = this.config.getString('NOT_SET_PLACEHOLDER');
    }
    return this.notSetPlaceholder;
  }
}
