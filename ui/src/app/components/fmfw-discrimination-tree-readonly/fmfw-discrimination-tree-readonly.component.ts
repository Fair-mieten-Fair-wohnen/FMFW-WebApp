import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ITreeOptions, TreeNode} from "angular-tree-component";
import {Item} from "../../items/services/items/incident";
import {ValueListService} from "../../items/services/value-lists/value-list.service";
import {HierarchicValueListItem} from "../../items/services/value-lists/hierarchic-value-list-item";
import {ConfigService} from "../../services/config/config.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'fmfw-discrimination-tree-readonly',
  templateUrl: './fmfw-discrimination-tree-readonly.component.html',
  styleUrls: ['./fmfw-discrimination-tree-readonly.component.css']
})
export class FmfwDiscriminationTreeReadonlyComponent implements OnInit, OnDestroy {

  @Input() item: Item;

  /** optional: name of the hierarchical key value list for the tree IF different to 'grounds_of_discrimination'  */
  @Input() keyValueListName: string = "grounds_of_discrimination";

  /** optional: dot separated path to the item parameter IF different to 'incident_typology.grounds_of_discrimination' */
  @Input() paramPath: string = "incident_typology.grounds_of_discrimination";

  /** optional: set if different placeholder than config.NOT_SET_PLACEHOLDER should be displayed if nothing selected */
  @Input() notSetPlaceholder: string;

  /** optional: set if others is selectable but the others key is different to config.OTHER_SELECTION_KEY */
  @Input() otherSelectionKey: string;

  @Input() othersSuffix: string = "_others";

  options: ITreeOptions = {
    displayField: 'label',
    idField: 'key',
    childrenField: 'list',
    hasChildrenField: 'isFolder',
    nodeClass: (node:TreeNode) => {
      return node.data.isFolder || node.data.key == "other" ? 'tree-folder': 'tree-leaf';
    }
  };

  groundsOfDiscrimination: HierarchicValueListItem[];

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
        // TODO: show loading...
        if (this.keyValueListName) {
           this.subscr = this.valueList.getHierarchicalValueList(this.keyValueListName).subscribe(
            list => {
              this.initDiscriminationTree(list, param);
            });
        }
      }
    }
  }

  /**
   * filter discrimination tree for only selected leafs
   * @param list discrimination tree from valueList endpoint
   * @param saveTo variable name to store the filtered tree to
   */
  public initDiscriminationTree(valueList:any, selection: any) {
    let list = JSON.parse(JSON.stringify(valueList));

    const selectedLeafs = selection.selected_grounds;
    const otherGrounds = selection.other_grounds;

    if (selectedLeafs && list) {
      list.forEach(section => {
        if (section.list) {

          // filter out selected leafs
          section.list = section.list.filter(
            // defined && true
            leaf => selectedLeafs[leaf.key]);
          // add other grounds input to label
          section.list = section.list.map(leaf => this.addOthersInputToLabel(leaf));
        } else {
          if (selectedLeafs[section.key]) {
            // add top level others field
            section.label += ": ";
            if (otherGrounds && otherGrounds[section.key] && otherGrounds[section.key].length > 0)
              section.label += otherGrounds[section.key];
            else
              section.label += this.notSetPlaceholder;
          }
          else {
            section.list = [];
          }
        }
      });

      // filter out parents with empty lists
      list = list.filter(section =>
        (!section.list || section.list.length > 0));

      // save result to variable which is assigned to tree
      this.groundsOfDiscrimination = list;
    }
  }

  initializeTree(tree) {
    tree.treeModel.expandAll();
  }

  private addOthersInputToLabel(leaf: any): any {
    const otherGrounds = this.item.incident_typology.grounds_of_discrimination.other_grounds ? this.item.incident_typology.grounds_of_discrimination.other_grounds : [];

    if (leaf.key.includes(this.getOtherSelectionKey())) {
      // add other grounds to label
      leaf.label += ": ";
      if (otherGrounds[leaf.key] && otherGrounds[leaf.key].length > 0)
        leaf.label += otherGrounds[leaf.key];
      else
        leaf.label += this.notSetPlaceholder;
    }
    return leaf;
  }

  private getDefaultPlaceholder(): string[] {
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
