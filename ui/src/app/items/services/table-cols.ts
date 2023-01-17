export class TableCols {
  constructor(
    public id: number,
    public label: string,
    public ref?: string,
    public type?: string,
    public weight?: number
  ) {}
}
