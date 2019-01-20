import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { StateService } from './state.service';
import { InventoryChartService } from './inventory-chart.service';
import { MathService } from './math.service';
import { PeriodsService } from './periods.service';
import {
  LayoutService,
} from '../utils/layout.service';

const SERVICES = [
  UserService,
  StateService,
  InventoryChartService,
  PeriodsService,
  MathService,
  LayoutService
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
