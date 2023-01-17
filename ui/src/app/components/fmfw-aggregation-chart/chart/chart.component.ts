import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import 'chartjs-plugin-datalabels';
import {AggregationData} from "../../../aggregation/services/aggregation-data";
import {ConfigService} from "../../../services/config/config.service";
import {ChartRowData} from "./chart-row-data";
import {Options} from "chartjs-plugin-datalabels/types/options";

export const GGS_TYPE = {
  AMF: 'Allgemeine Beratung, Meldung, Fallbetreuung',
  MF: 'Meldung, Fallbetreuung',
  F: 'Fallbetreuung',
};

export const OPTIONS_LABEL_IN_BAR: Options = {
  color: 'white',
  display: function (context) {
    return context.dataset.data[context.dataIndex] >= 5;
  },
  font: {
    size: 16
  },
  formatter: Math.round
};

export const OPTIONS_LABEL_ON_TOP: Options = {
  color: 'black',
  align: "top",
  anchor: "end",
  font: {
    size: 16
  },
  formatter: Math.round
};

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild('chart', {static: false}) mychart:ElementRef<HTMLCanvasElement>;

  @Input() printable: boolean = true;

  private _labelOnTop: boolean = true;
  private _suggestedMaxY: number = -1;

  private _chartData: AggregationData;
  @Input()
  set chartData(data: AggregationData) {
    this._chartData = data;
    // Kreuztabelle have labels in the stacked bars, simple bar charts have labels above bars
    this._labelOnTop = data && data.data && data.data.length < 2;
    this.calcGGSStr(data);
    this.updateData();
  };

  private _title: string;
  @Input()
  set title(title: string) {
    this._title = title;
    this.updateChartOptions()
  };

  private _type: string = 'bar';
  @Input()
  set type(type: string) {
    this._type = type;
    this.updateType();
  }

  colors: string[];
  ggsStr: string = '';

  private xLabelRotationBound = 10;
  canvas: any;
  ctx: any;
  chart: any;
  options: ChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          fontSize: 16
        }
      }],
      xAxes: [{
        ticks: {
          fontSize: 16,
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90
        }
      }]
    },
    plugins: {
      datalabels: OPTIONS_LABEL_ON_TOP
    }
  };

  constructor(
    private config: ConfigService
  ) { }

  ngOnInit() {
    this.colors = this.config.getStringArray("CHART_COLORS");
  }

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.renderChart();
  }

  public openChartInNewTab() {
    var win = window.open();
    win.document.write("<br><img width='1000px' src='" + this.mychart.nativeElement.toDataURL() + "'/><br>" + this.ggsStr);
  }

  private renderChart() {
    if (this.canvas && this.ctx) {

      const data = this.calculateData(this._chartData);

      this.defineOptions();
      this.setXLabelRotation(this._chartData.rowLabels);

      if (!this.chart) {
        this.chart = new Chart(this.ctx, {
          type: this._type,
          data: data,
          options: this.options
        });
      } else {
        this.chart.data = data;
        this.chart.type = this._type;
        this.chart.options = this.options;
        this.chart.update();
      }
    }
  }

  private defineOptions() {
    this.options.legend = {
      display: this._chartData.rowLabels && this._chartData.rowLabels.length > 0,
      position: "right"
    };
    this.options.title = {
      text: this._title,
    };
    this.options.plugins.datalabels = this._labelOnTop ? OPTIONS_LABEL_ON_TOP : OPTIONS_LABEL_IN_BAR;
    if (this._suggestedMaxY > 0) {
      this.options.scales.yAxes[0].ticks.suggestedMax = this._suggestedMaxY;
    }
  }

  private setYMaxForSimpleCharts(_chartData: number[][]) {
    if (_chartData.length === 1) {
      const maxYVal: number = _chartData[0].reduce(
        (previousValue: number, currentValue: number) =>
          currentValue > previousValue ? currentValue : previousValue, 0
      )
      const delta: number =
        maxYVal > 500 ? 100 :
        maxYVal > 200 ? 50 :
        maxYVal > 100 ? 20 :
        maxYVal > 50 ? 10 : 5;
      this._suggestedMaxY = maxYVal + delta;
    }
  }

  private calculateData(_chartData: AggregationData): any {
    let dataset = [];

    if (_chartData && _chartData.data) {
      dataset = _chartData.data.map( (row, index) => {
        let rowData: ChartRowData = {
          data: row,
          stack: "_",
          backgroundColor: this.getColor(index)
        };
        if (_chartData.rowLabels && _chartData.rowLabels[index])
          rowData.label =  _chartData.rowLabels[index];
        return rowData;
      });
      this.setYMaxForSimpleCharts(_chartData.data);
    }

    const data = {
      labels: _chartData.columnLabels,
      datasets: dataset
    };

    return data;
  }

  private updateData() {
    if (this.chart) {

      this.chart.data = this.calculateData(this._chartData);

      this.updateChartOptions();
    }
    // else wait for initialization in ngAfterViewInit

  }

  private updateChartOptions() {
    if (this.chart) {

      this.defineOptions();

      this.chart.options = this.options;

      this.chart.update();
    }

  }

  private updateType() {
    if (this.chart) {
      this.chart.type = this._type;
      this.chart.update();
    }
  }
  private setXLabelRotation(rowLabels) {
    if (rowLabels && rowLabels.length > this.xLabelRotationBound) {
      this.options.scales.xAxes[0].ticks.minRotation = 90;
    } else {
      this.options.scales.xAxes[0].ticks.minRotation = 0;
    }
  }

  private calcGGSStr(data: AggregationData) {
    if (data && data.ggstype && data.casesCur != undefined && data.casesAll != undefined) {
      this.ggsStr = `Grundgesamtheit (N) = ${data.casesAll} (${GGS_TYPE[data.ggstype]}), Merkmalsausprägung (n) = ${data.casesCur}`;
    } else {
      this.ggsStr = '';
    }
  }

  private getColor(index: number): string {
    if (!this.colors) return 'rgb(51, 102, 153)';
    return this.colors[index % this.colors.length];
  }
}
