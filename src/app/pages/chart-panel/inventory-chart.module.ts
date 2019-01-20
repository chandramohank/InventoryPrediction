import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { InventoryChartComponent } from './inventory-chart.component';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
    imports: [
      ThemeModule,
      ChartModule,
      NgxEchartsModule,
      NgxChartsModule,
    ],
    declarations: [
        InventoryChartComponent,
    ],
})
export class InventoryChartModule { }