import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ValueListItem} from "../../items/services/value-lists/value-list-item";
import {ValueListService} from "../../items/services/value-lists/value-list.service";
import {ConfigService} from "../../services/config/config.service";
import {PathResolver} from "../../items/services/items/path-resolver";
import {Subscription} from "rxjs";

/**
 * Component to display selection from valuelist based select boxes in a textview - for summary tab
 *
 * Template:
 *
 <fmfw-selectbox-content-textview
   i18n-label=""
   label=":"
   keyValueListName=""
   [item]="item"
   paramPath=""
 ></fmfw-selectbox-content-textview>

 */
@Component({
  selector: 'fmfw-selectbox-content-textview',
  templateUrl: './fmfw-selectbox-content-textview.component.html',
  styleUrls: ['./fmfw-selectbox-content-textview.component.css']
})
export class FmfwSelectboxContentTextviewComponent implements OnInit, OnDestroy {

  @Input() label: string;
  @Input() keyValueListName: string;
  @Input() item: PathResolver;
  @Input() paramPath: string;           /** dot separated path to the item parameter, in which the selection is saved,
                                            example: generaldata.contact_by */
  @Input() multiple: boolean = false;   /** optional: set to true if this is from a multi select field */
  @Input() notSetPlaceholder: string;   /** optional: set if different placeholder than config.NOT_SET_PLACEHOLDER
                                            should be displayed if nothing selected */
  @Input() otherSelectionKey: string;   /** optional: set if others is selectable but the others key is different to
                                            config.OTHER_SELECTION_KEY */
  @Input() othersSuffix: string = "_others";

  otherFieldValue: string;
  fieldValueList: string[] = [];
  keyValueList: ValueListItem[];
  otherSelectionLabel: string = "DEFAULTLABEL";
  loading: string;

  constructor(
    private valueList: ValueListService,
    private config: ConfigService
  ) { }

  subscr: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }
  ngOnInit() {
    if (this.item && this.paramPath) {
      const param = this.item.resolveParam(this.paramPath);
      if (param) {
        this.loading = "loading...";
        if (this.keyValueListName) {
          this.subscr = this.valueList.getValueList(this.keyValueListName).subscribe(
      list => {
              this.keyValueList = list;

              // handle single and multi select fields together
              let params = Array.isArray(param) ? param : [param];

              // handle 'others' selection
              if (params.includes(this.getOtherSelectionKey())) {
                // get others value
                const othersParam = this.item.resolveParam(this.paramPath + this.othersSuffix);
                this.otherFieldValue = othersParam ? othersParam : this.getDefaultPlaceholder()[0];
                // display label of this others field
                const othersListItem = this.keyValueList.filter(listitem => listitem.key === this.getOtherSelectionKey());
                if (othersListItem && othersListItem.length > 0) {
                  this.otherSelectionLabel = othersListItem[0].label;
                }
                // remove others key from params
                params = params.filter(param => param !== this.getOtherSelectionKey());
              }

              const result = this.keyValueList.filter(listitem => params.includes(listitem.key));

              this.loading = undefined;

              if (result && result.length > 0){

                this.fieldValueList = result.map(val => val.label);

              } else {
                this.setNotSetPlaceholder();
              }
            },
        error => {
              this.fieldValueList = ["an error occurred: valueList cannot be loaded"];
            });
        } else {
          this.fieldValueList = ["an error occurred: name of valueList for select list options not defined"];
        }
      } else {
        this.setNotSetPlaceholder();
      }
    } else {
      this.setNotSetPlaceholder();
    }
  }

  private setNotSetPlaceholder() {
    if (!this.multiple) {
      this.fieldValueList = this.getDefaultPlaceholder();
    }
  }

  public getDefaultPlaceholder(): string[] {
    if (!this.notSetPlaceholder) {
      this.notSetPlaceholder = this.config.getString('NOT_SET_PLACEHOLDER');
    }
    return [this.notSetPlaceholder];
  }

  private getOtherSelectionKey(): string {
    if (!this.otherSelectionKey) {
      this.otherSelectionKey = this.config.getString('OTHER_SELECTION_KEY');
    }
    return this.otherSelectionKey;
  }

}
