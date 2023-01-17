export class ChartOptions {
  public legend: {
    display: boolean,
    position: string
  };
  public title?: any;
  public layout: {};

  constructor(props) {
    this.legend = {
      display: props.rowLabels && props.rowLabels.length > 0,
      position: "right"
    };

    if (props.title) {
      this.title = {
        display: true,
        text: props.title,
        fontSize: 30,
        fontStyle: 'normal',
        padding: 30
      }
    }
  }
}
