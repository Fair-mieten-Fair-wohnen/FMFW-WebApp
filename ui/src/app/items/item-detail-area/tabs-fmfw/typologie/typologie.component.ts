import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "../../../../services/config/config.service";
import {Item} from "../../../services/items/incident";
import {ItemsService} from "../../../services/items/items.service";
import {ValueListService} from "../../../services/value-lists/value-list.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IActionMapping, ITreeOptions, TREE_ACTIONS, TreeNode} from "angular-tree-component";
import {HierarchicValueListItem} from "../../../services/value-lists/hierarchic-value-list-item";
import {IDTypeDictionary} from "../../../../../../node_modules/angular-tree-component/dist/defs/api";
import {forkJoin, Observable, Subscription} from "rxjs";
import {GeneralUtilsService} from "../../../services/utils/general-utils.service";

const actionMapping:IActionMapping = {
  mouse: {
    click: (tree, node, $event) => {
      TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event);
    }
  }
};

@Component({
  selector: 'app-typologie',
  templateUrl: './typologie.component.html',
  styleUrls: ['./typologie.component.css']
})
export class TypologieComponent implements OnInit, OnDestroy {

  item: Item;

  incidentTypologyForm: FormGroup;
  generalForm: FormGroup;

  /**
   * Value List for select district
   */
  groundsOfDiscrimination: HierarchicValueListItem[];

  showAdditionalInputs = false;
  otherSelectionKey:string;

  headingId = 'typologie';
  heading:string;


  options: ITreeOptions = {
    displayField: 'label',
    idField: 'key',
    childrenField: 'list',
    hasChildrenField: 'isFolder',
    nodeClass: (node:TreeNode) => {
      return node.data.isFolder || node.data.key == "other" ? 'tree-folder': 'tree-leaf';
    },
    actionMapping
  };

  constructor(
    private config: ConfigService,
    private items: ItemsService,
    private valueLists: ValueListService,
    private fb: FormBuilder,
    private utils: GeneralUtilsService
  ) { }

  subscr: Subscription;
  subscr2: Subscription;
  subscr3: Subscription;
  ngOnDestroy(): void {
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
    if (this.subscr2) {
      this.subscr2.unsubscribe();
    }
    if (this.subscr3) {
      this.subscr3.unsubscribe();
    }
  }
  ngOnInit() {
    this.generalForm = this.fb.group({
        area_of_discrimination:  this.fb.group( {
          selected: [''],
          others: ['']
        }),
        form_of_discrimination:  this.fb.group( {
          selected: [''],
          others: ['']
        })
      }
    );
    this.incidentTypologyForm = this.fb.group({
      general: this.generalForm,
      grounds_of_discrimination: this.fb.group({
        other_grounds: this.fb.group({})
      })
    });

    this.incidentTypologyForm.patchValue({
      // empty form
      general: {
        area_of_discrimination: {
          selected: '',
          others: ''
        },
        form_of_discrimination: {
          selected: '',
          others: ''
        }
      },
      grounds_of_discrimination: {
        other_grounds: {}
      }
    }, {emitEvent: false});

    this.heading = this.config.getTabLabelForId(this.headingId);

    this.otherSelectionKey = this.config.getOtherSelectionKey();

    const observableList: Observable<any>[] = [];
    // load valueLists
    observableList.push(this.loadExtList('grounds_of_discrimination'));
    // load item
    observableList.push(this.items.getCurrentLoadedItem());

    // wait until all valueLists and the item is loaded
    this.subscr = forkJoin(observableList).subscribe(results => {
      // results[0] -> grounds_of_discrimination -> init tree
      this.initTree(results[0], 'groundsOfDiscrimination');
      // results[1] -> item
      this.initItem(results[1]);
      this.initOtherFields();
      this.onChanges();
    });
  }

  private initItem(item: Item) {
    this.item = new Item(item);
    if (this.item && this.item.incident_typology) {
      let general_val = {};

      if (this.item.incident_typology.general){
        // intialize general data
        const general = this.item.incident_typology.general;
        general_val = {
          area_of_discrimination: this.utils.uniteSelectedAndOthers(general,'area_of_discrimination'),
          form_of_discrimination: this.utils.uniteSelectedAndOthers(general,'form_of_discrimination'),
        };
      } else {
        general_val = {
          area_of_discrimination: {
            selected: '',
            others: ''
          },
          form_of_discrimination: {
            selected: '',
            others: ''
          }
        };
      }

      this.generalForm.setValue(general_val, {emitEvent: false});
    }
  }

  private initTree(list: any, saveTo: string) {
    this[saveTo] = list;
    let other_values = {};
    list.forEach(x => other_values[x.key + (x.key == this.config.getOtherSelectionKey() ? '' : '_' + this.config.getOtherSelectionKey())] = ['']);
    this.incidentTypologyForm = this.fb.group({
      general: this.fb.group({
        area_of_discrimination: {
          selected: '',
          others: ''
        },
        form_of_discrimination: {
          selected: '',
          others: ''
        }
      }),
      grounds_of_discrimination: this.fb.group({
        other_grounds: this.fb.group(other_values)
      })
    });
  }

  private initOtherFields() {
    let other_grounds_val = {};
    if ( this.item
      && this.item.incident_typology
      && this.item.incident_typology.grounds_of_discrimination
      && this.item.incident_typology.grounds_of_discrimination.other_grounds) {
      // initialize otherSelectionValues
      other_grounds_val = this.item.incident_typology.grounds_of_discrimination.other_grounds;
    }

    let val = {
      grounds_of_discrimination: {
        other_grounds: other_grounds_val
      }
    };

    this.incidentTypologyForm.patchValue(val, {emitEvent: false});
  }

  /**
   * emit item changes in
   * item.incident_typology.general
   * and item.incident_typologygrounds_of_discrimination.other_grounds
   * to itemsService -> changes are stored locally and 'changed' flag is set to e.g. activate save button in footer
   */
  onChanges(): void {
    this.subscr2 = this.generalForm.valueChanges.subscribe(val => {
      if (!this.item.incident_typology) this.item.incident_typology = {};
      this.item.incident_typology.general = val;
      this.item.incident_typology.general = this.utils.extractSelectedAndOthers(
        val.area_of_discrimination,
        'area_of_discrimination',
        val);

      this.item.incident_typology.general = this.utils.extractSelectedAndOthers(
        val.form_of_discrimination,
        'form_of_discrimination',
        val);

      this.items.itemChanged(this.item);
    });
    this.subscr3 = this.incidentTypologyForm.get('grounds_of_discrimination').valueChanges.subscribe(val => {
      if (!this.item.incident_typology) this.item.incident_typology = {};
      // -> grounds_of_discrimination.selected_grounds are not part of val because the tree isn't part of the form
      if (!this.item.incident_typology.grounds_of_discrimination) this.item.incident_typology.grounds_of_discrimination = {};
      this.item.incident_typology.grounds_of_discrimination.other_grounds = val.other_grounds;

      this.items.itemChanged(this.item);
    });
  }

  ////////////////////// Handle Discrimination Tree //////////////////////////////
  /**
   * save changes in discrimination grounds tree
   * @param dict
   */
  private updateSelectedDiscriminationInItem(dict: IDTypeDictionary) {
    if (this.item) {
      if (!this.item.incident_typology) this.item.incident_typology = {};
      if (!this.item.incident_typology.grounds_of_discrimination) this.item.incident_typology.grounds_of_discrimination = {};
      this.item.incident_typology.grounds_of_discrimination.selected_grounds = dict;
      this.items.itemChanged(this.item);
    }
  }

  initializeTree(tree) {
    if (this.item
      && this.item.incident_typology
      && this.item.incident_typology.grounds_of_discrimination
      && this.item.incident_typology.grounds_of_discrimination.selected_grounds) {
      let curState = tree.treeModel.getState();
      curState.selectedLeafNodeIds = this.item.incident_typology.grounds_of_discrimination.selected_grounds;
      tree.treeModel.setState(curState);
    }
    tree.treeModel.expandAll();
  }

  activated(val) {
    if (val.node.data.isFolder) {
      val.node.expand();
    } else {
      if (!val.node.isSelected) {
        val.node.setIsSelected(true);
      }
    }
  }
  selected(val) {
    if (val.node){
      if (!val.node.isActive) {
        val.node.setIsActive(true, true);
      }
      this.updateSelectedDiscriminationInItem(val.treeModel.selectedLeafNodeIds);
    }
  }

  deactivated(val) {
    if (val.node.data.isFolder) {
      val.node.collapse();
    } else {
      if (val.node.isSelected) {
        val.node.setIsSelected(false);
      }
    }
  }
  deselected(val) {
    if (val.node) {
      if (val.node.isActive) {
        val.node.setIsActive(false, true);

        // if an OthersSelectionCheckbox as deactivated, remove the others string of this section
        if (val.node.data && val.node.data.key && val.node.data.key.includes("_" + this.otherSelectionKey)) {
          let newValue =
          {
            grounds_of_discrimination: {
              other_grounds: {}
            }
          };
          newValue.grounds_of_discrimination.other_grounds[val.node.data.key] = "";
          this.incidentTypologyForm.patchValue(newValue);
        }
      }
      this.updateSelectedDiscriminationInItem(val.treeModel.selectedLeafNodeIds);
    }
  }

  ///////////////////// Value Lists /////////////////////////
  private loadExtList(mapName: string) {
    return this.valueLists.getHierarchicalValueList(mapName);
  }
}
