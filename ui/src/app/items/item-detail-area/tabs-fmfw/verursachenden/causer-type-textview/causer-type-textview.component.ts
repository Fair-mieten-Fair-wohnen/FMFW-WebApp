import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "../../../../../services/config/config.service";
import {CauserType} from "../../../../services/items/causer-type";
import {ValueListService} from "../../../../services/value-lists/value-list.service";
import {forkJoin, Observable, Subscription} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'fmfw-causer-type-textview',
  templateUrl: './causer-type-textview.component.html',
  styleUrls: ['./causer-type-textview.component.css']
})
export class CauserTypeTextviewComponent implements OnInit, OnDestroy {

  @Input() causerType: CauserType;

  static causerTypes:Map<string,any>;
  static ownerAgency:Map<string,any>;
  static numberOfAppartments:Map<string,any>;

  static notSetPlaceholder: string;
  static otherSelectionKey: string;
  static otherSelectionLabel: string;

  causerTypeStr: string;

  constructor(
    private config: ConfigService,
    private valueLists: ValueListService,
  ) {}

  subscr: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
  }
  ngOnInit() {
    if (!CauserTypeTextviewComponent.causerTypes) {
      const observableList: Observable<any>[] = [];
      // load valueLists
      observableList.push(this.loadMap('causer', 'causerTypes'));
      observableList.push(this.loadMap('owner_agency', 'ownerAgency'));
      observableList.push(this.loadMap('number_of_appartments', 'numberOfAppartments'));

      this.subscr = forkJoin(observableList).subscribe(_ => {
        this.formatCauserType();
      });
    }
    else
      this.formatCauserType();
  }

  private loadMap(mapName: string, saveTo: string) {
    return this.valueLists.getValueListAsMap(mapName).pipe(
      tap(list => CauserTypeTextviewComponent[saveTo] = list)
      // TODO: error handling
    );
  }

  public formatCauserType() {
    if (this.causerType)
      this.causerTypeStr = this.getCauserString(this.causerType);
  }

  public getCauserString(causer_type: CauserType): string {
    if (!causer_type || !causer_type.causer_type) return '';
    if (causer_type.causer_type == this.getOtherSelectionKey())
      return causer_type.causer_type_others ?
        causer_type.causer_type_others :
        this.getOtherSelectionLabel();

    return this.createCauserStr(causer_type);
  }

  /////////////// Create causer type string //////////////////////////
  /**
   * returns the number of appartments if inserted by user
   * OR - if OTHERS selected - the inserted string OR "others" if not inserted
   * OR undefined if user hasn't selected one at all
   * @param causer_type
   */
  private getNumberOfAppartmentsStr(causer_type: CauserType): string {
    if (!causer_type.number_of_appartments) return undefined;
    if (causer_type.number_of_appartments == this.getOtherSelectionKey())
      return causer_type.number_of_appartments_others ?
        causer_type.number_of_appartments_others :
        this.getOtherSelectionLabel();

    return CauserTypeTextviewComponent.numberOfAppartments[causer_type.number_of_appartments] ?
        CauserTypeTextviewComponent.numberOfAppartments[causer_type.number_of_appartments].label :
        '';
  }

  /**
   * returns the kind of appartment or house if inserted by user
   * OR - if OTHERS selected - the inserted string OR "others" if not inserted
   * OR undefined if user hasn't selected one at all
   * @param causer_type
   */
  private getOwnerAgencyStr(causer_type: CauserType): string {
    if (!causer_type.owner_agency) return undefined;
    if (causer_type.owner_agency == this.getOtherSelectionKey())
      return causer_type.owner_agency_others ?
        causer_type.owner_agency_others :
        this.getOtherSelectionLabel();

    return CauserTypeTextviewComponent.ownerAgency[causer_type.owner_agency] ?
        CauserTypeTextviewComponent.ownerAgency[causer_type.owner_agency].label :
        '';
  }

  /**
   * returns the causer type if inserted by user
   * OR - if OTHERS selected - the inserted string OR "others" if not inserted
   * OR an empty string if user hasn't selected one at all;
   * IF owner or agency has been selected, owner_agency and numberOfAppartments is appended if selected
   * @param causer_type
   */
  private createCauserStr(causer_type: CauserType): string {
    let causerStr = CauserTypeTextviewComponent.causerTypes[causer_type.causer_type] ?
      CauserTypeTextviewComponent.causerTypes[causer_type.causer_type].label : '';
    if (causer_type.causer_type == 'owner' || causer_type.causer_type == 'agency') {
      const ownerAgency = this.getOwnerAgencyStr(causer_type);
      const numberOfAppartments = this.getNumberOfAppartmentsStr(causer_type);
      if (ownerAgency || numberOfAppartments) {
        causerStr += " (";
        if (ownerAgency) causerStr += ownerAgency;
        if (ownerAgency && numberOfAppartments) causerStr += ", ";
        if (numberOfAppartments) causerStr += numberOfAppartments;
        causerStr += ")";
      }
    }
    return causerStr;
  }

  private getDefaultPlaceholder(): string {
    if (!CauserTypeTextviewComponent.notSetPlaceholder) {
      CauserTypeTextviewComponent.notSetPlaceholder = this.config.getString('NOT_SET_PLACEHOLDER');
    }
    return CauserTypeTextviewComponent.notSetPlaceholder;
  }

  private getOtherSelectionKey(): string {
    if (!CauserTypeTextviewComponent.otherSelectionKey) {
      CauserTypeTextviewComponent.otherSelectionKey = this.config.getString('OTHER_SELECTION_KEY');
    }
    return CauserTypeTextviewComponent.otherSelectionKey;
  }

  private getOtherSelectionLabel(): string {
    if (!CauserTypeTextviewComponent.otherSelectionLabel) {
      CauserTypeTextviewComponent.otherSelectionLabel = this.config.getString('OTHER_SELECTION_LABEL');
    }
    return CauserTypeTextviewComponent.otherSelectionLabel;
  }

}
