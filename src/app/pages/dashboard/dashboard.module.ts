import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PrepLineItemService } from '../../@core/data/prepworksheetlineItems.service';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [
    PrepLineItemService,
  ],
})
export class DashboardModule { }
