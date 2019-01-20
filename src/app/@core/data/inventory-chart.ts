export interface InventoryChart {
    chartLabel: string[];
    linesData: number[];
  }
  
  export abstract class InventoryChartData {
    abstract getInventoryChartData(period: string): InventoryChart;
  }
  
  










