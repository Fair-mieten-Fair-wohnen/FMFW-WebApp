export class ChartRowData {
  public data: number[];
  public backgroundColor: string;
  public stack?: string;
  public label?: string;

  constructor(props) {
    this.data = props.data;
    this.backgroundColor = props.backgroundColor;
    this.stack = props.stack || "_";
    this.label = props.label;
  }

}
