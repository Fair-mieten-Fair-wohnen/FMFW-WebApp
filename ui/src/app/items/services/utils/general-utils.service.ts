import {Injectable, OnInit} from '@angular/core';
import {ConfigService} from "../../../services/config/config.service";

@Injectable({
  providedIn: 'root'
})
export class GeneralUtilsService {

  otherKey = undefined;
  otherLabel = undefined;

  constructor(
    public config: ConfigService
  ) { }

  /**
   * return the string object of the parameter of the baseObject OR undefined if the parameter isn't defined
   * (checks if the baseObject has the given parameter)
   * @param baseObject the base object in which the param is looked for
   * @param paramPath comma separated string array with the path to the param; example: general_data.incident_type -> ['general_data', 'incident_type']
   */
  public checkParamForStringValueExists(baseObject: any, paramPath: string[]): boolean {
    // check if param is set
    let exists = true;
    let i:number = 0;
    let param: any = baseObject;

    while (exists && i<paramPath.length){
      if (param[paramPath[i]]) param = param[paramPath[i]];
      else exists = false;
      i++;
    }
    return exists;
  }

  /**
   * return the string object of the parameter of the baseObject OR undefined if the parameter isn't defined
   * (checks if the baseObject has the given parameter)
   * @param baseObject the base object in which the param is looked for
   * @param paramPath comma separated string array with the path to the param; example: general_data.incident_type -> ['general_data', 'incident_type']
   */
  public resolveParamForStringValue(baseObject: any, paramPath: string[]): string {
    // check if param is set
    let exists = true;
    let i:number = 0;
    let param: any = baseObject;

    while (exists && i<paramPath.length){
      if (param[paramPath[i]]) param = param[paramPath[i]];
      else exists = false;

      i++;
    }
    return exists ? param : undefined;
  }

  /**
   * returns if user has selected the 'others' option
   * @param selectedOption
   */
  public checkIfOptionOtherIsSet(selectedOption: string): boolean {
    if (!this.otherKey) this.otherKey = this.config.getString('OTHER_SELECTION_KEY');
    return (selectedOption && selectedOption.includes(this.otherKey));
  }

  public getOtherOptionLong(baseObject: any, otherParamPath: string[]): string {
    if (!this.otherLabel) this.otherLabel = this.config.getString('OTHER_SELECTION_LABEL');
    let val = this.otherLabel;
    const otherString = this.resolveParamForStringValue(baseObject, otherParamPath);
    if (otherString) val += ": " + otherString;
    return val;
  }

  public getOptionFromMap(option: string, valueMap: Map<string,any>): string {
    return valueMap[option] ? valueMap[option].label : undefined;
  }

  public extractSelectedAndOthers(selection: {selected: any, others: string}, paramName: string, add2Struct: any): any {

    add2Struct[paramName] = undefined;

    if (selection) {
      if (selection.selected) {
        add2Struct[paramName] = selection.selected;
      }
      if (selection.others) {
        const othersParamName = paramName + '_others';
        add2Struct[othersParamName] = selection.others;
      }
    }
    return add2Struct;
  }

  public uniteSelectedAndOthers(completeStruct: any, paramName: string): any {

    const selection = {
        selected: completeStruct[paramName] ? completeStruct[paramName] : '',
        others: completeStruct[paramName + '_others'] ? completeStruct[paramName + '_others'] : ''
    };
    return selection;
  }

  public string2date(dateStr: string): Date {
    return dateStr ? new Date(dateStr) : null;
  }

  public date2ISOString(date: Date): string {
    return date ? date.toISOString() : '';
  }

  public static resolveParamPath(baseObj: any, paramPath: string[]): string {
    // check if param is set
    let exists = true;
    let i:number = 0;
    let param: any = baseObj;

    while (exists && i<paramPath.length){
      if (param[paramPath[i]]) param = param[paramPath[i]];
      else exists = false;

      i++;
    }
    return exists ? param : undefined;
  }

}
