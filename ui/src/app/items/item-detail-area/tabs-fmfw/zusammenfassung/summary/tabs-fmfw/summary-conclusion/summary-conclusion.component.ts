import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../../../services/items/incident";
import {TEXTVIEW_FORMATS} from "../../../../../../../components/fmfw-textview/fmfw-textview.component";
import {tap} from "rxjs/operators";
import {ConfigService} from "../../../../../../../services/config/config.service";
import {ItemsService} from "../../../../../../services/items/items.service";
import {ValueListService} from "../../../../../../services/value-lists/value-list.service";
import {GeneralUtilsService} from "../../../../../../services/utils/general-utils.service";
import {forkJoin, Observable, Subscription} from "rxjs";

@Component({
  selector: 'fmfw-summary-conclusion',
  templateUrl: './summary-conclusion.component.html',
  styleUrls: ['./summary-conclusion.component.css']
})
export class SummaryConclusionComponent implements OnInit {

  @Input() item: Item;

  otherSelectionKey = '';
  otherSelectionLabel = '';
  notSetPlaceholder = '';

  goalsPersonConcerned:Map<string,any>;
  areasOfLaw:Map<string,any>;

  // no value list loaded
  valueListsLoaded = false;

  constructor(
    private config: ConfigService,
    private items: ItemsService,
    private valueLists: ValueListService,
    private utils: GeneralUtilsService
  ) { }

  ngOnInit() {
    this.notSetPlaceholder = this.config.getString('NOT_SET_PLACEHOLDER');
    this.otherSelectionKey = this.config.getString('OTHER_SELECTION_KEY');
    this.otherSelectionLabel = this.config.getString('OTHER_SELECTION_LABEL');

    const observableList: Observable<any>[] = [];

    // load valueLists
    observableList.push(this.loadMap('goal_person_concerned', 'goalsPersonConcerned'));
    observableList.push(this.loadMap('areas_of_law', 'areasOfLaw'));

    // load item
    observableList.push(this.items.getCurrentLoadedItem());

    // wait until all valueLists are loaded
    this.subscr = forkJoin(observableList).subscribe(results => {
      this.initItem(results[results.length-1]);
      this.valueListsLoaded = true;
    });
  }

  subscr: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }

  public get TEXTVIEW_FORMATS(): any {
    return TEXTVIEW_FORMATS;
  }

  private loadMap(mapName: string, saveTo: string) {
    return this.valueLists.getValueListAsMap(mapName).pipe(
      tap(list => this[saveTo] = list)
      // TODO: error handling
    );
  }

  public listWithoutOthersSelection(listName: string, list: string[], valueMap:Map<string,any>): string[] {
    if (!this[listName]){
      const filteredList = list.filter(
        elem => elem != this.otherSelectionKey);
      this[listName] = filteredList.map(
        elem => this.utils.getOptionFromMap(elem, valueMap)
      )
    }
    return this[listName];
  }

  /**
   * returns the string object of the parameter of the given object OR the defined string for not set value
   * (checks if the baseObject has the given parameter)
   * @param baseObject base object where we wan to get the param from
   * @param paramPath comma separated string array with the path to the param; example: general_data.incident_type -> ['general_data', 'incident_type']
   * @param _notSetPlaceholder (optinal) if not set the notSetPlaceholder from config file is used
   */
  public paramValueOfObject(baseObject: any, paramPath: string[], _notSetPlaceholder?: string): string {
    const val = this.utils.resolveParamForStringValue(baseObject, paramPath);
    return val ? val : (_notSetPlaceholder ? _notSetPlaceholder : this.notSetPlaceholder);
  }

  private initItem(item: Item) {
    this.item = new Item(item);
  }
}
