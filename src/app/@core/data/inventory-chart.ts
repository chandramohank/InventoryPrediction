export interface InventoryChart {
    chartLabel: string[];
    linesData: number[];
    lines2Data: number[];
  }
  
  export abstract class InventoryChartData {
    abstract getInventoryChartData(period: string): InventoryChart;
  }
  
  










