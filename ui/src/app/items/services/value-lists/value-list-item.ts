export class ValueListItem {
  constructor(
    public id: string,
    public key: string,
    public label: string,
    public weight?: number,
    public isFolder?: boolean
  ) { }

}
