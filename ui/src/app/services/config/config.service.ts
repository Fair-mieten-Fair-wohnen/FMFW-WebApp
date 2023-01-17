import { Injectable } from '@angular/core';
import {Config} from "../../../assets/config";
import {NavTab} from "../../components/fmfw-details-side-nav/nav-tab";


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private tabLabelsForId:any = undefined;

  constructor() { }

  public getNavTabs(area: string, type: string): NavTab[] {
    const tabs: any = JSON.parse(JSON.stringify(Config[area]['ALL_TABS']));
    let navTabs = [];

    if (tabs && tabs.TAB_LABELS) {

      const activeTabLabels: string[] = Config[area]['ISSUE_TYPE'][type]['ACTIVE_TABS'];

      navTabs = tabs.TAB_LABELS
        .map(tab => new NavTab( tab.ID, tab.LABEL_DEFAULT, tab.COMPONENT_NAME ))
        .filter(tab => activeTabLabels.includes(tab.id));
    }

    return navTabs;
  }

  /**
   * initialize tabLabelsForId with tab labels from config file
   */
  private initTabLabels() {
    const areas = Config['AREAS'];

    this.tabLabelsForId = {};

    areas.forEach(area =>
      Config[area]['ALL_TABS']['TAB_LABELS'].forEach(tab => {
        this.tabLabelsForId[tab['ID']] = tab;
      })
  );
  }

  /**
   * get tab label for navTabId
   * @param navTabId id of the navTab to access label for
   */
  public getTabLabelForId(navTabId:string): any | undefined {
    if (!this.tabLabelsForId) this.initTabLabels();
    return (!this.tabLabelsForId[navTabId]) ? undefined : this.tabLabelsForId[navTabId]['LABEL_DEFAULT']
  }

  /**
   * get key of other selection of value lists from config
   * needed to display input field for individual selection
   */
  public getOtherSelectionKey(): string {
    return (Config['OTHER_SELECTION_KEY']) ? Config['OTHER_SELECTION_KEY']: 'OTHER';
  }

  /**
   * get label of other selection of value lists from config
   */
  public getOtherSelectionLabel(): string {
    return (Config['OTHER_SELECTION_LABEL']) ? Config['OTHER_SELECTION_LABEL']: 'anderes';
  }

  /**
   * get any string config param by name
   * returns undefined if not defined
   */
  public getString(configParam: string): string {
    if (Config) {
      return Config[configParam] ? Config[configParam]: undefined;
    } else {
      console.log("Config not defined!");
    }
  }

  public getStringFromPath(configPath: string): string {
    try {
      const path = configPath.split(".");
      let handle = Config[path[0]];
      path.forEach((nextSegment, index) => handle = index > 0 ? handle[nextSegment] : handle );
      return handle;
    } catch (e) {
      console.log(`Config ${configPath} not defined!`);
      return undefined;
    }
  }

  /**
   * get any string config param by name
   * returns undefined if not defined
   */
  public getStringArray(configParam: string): string[] {
    if (Config) {
      return Config[configParam] ? Config[configParam]: undefined;
    } else {
      console.log("Config not defined!");
    }
  }

  /**
   * get any number config param by name
   * returns undefined if not defined
   */
  public getNumber(configParam: string): number {
    return Config[configParam] ? Config[configParam] : undefined;
  }
}
