export class AggregationData {
  public aggregationType: string;
  public timeOfDataDump: string;

  public columnLabels: string[];
  public rowLabels: string[];
  public data: number[][];

  public casesCur: number;
  public casesAll: number;
  public ggstype: string;

  constructor(value: any) {
    this.aggregationType = value.aggregationType;
    this.timeOfDataDump = value.timeOfDataDump;

    this.columnLabels = value.columnLabels;
    this.rowLabels = value.rowLabels;
    this.data = value.data;

    this.casesCur = value.casesCur;
    this.casesAll = value.casesAll;
    this.ggstype = value.ggstype;
  }
}
