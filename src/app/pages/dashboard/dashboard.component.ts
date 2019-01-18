import { Component } from '@angular/core';
import { PrepLineItemService } from '../../@core/data/prepworksheetlineItems.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  settings = {    
    columns: {
      StartDate: {
        title: 'StartDate',
        type: 'date',
      },
      HoldTime: {
        title: 'Hold Time',
        type: 'string',
      },
      TaskName: {
        title: 'Task Name',
        type: 'string',
      },
      PrepTime: {
        title: 'Prep Time',
        type: 'string',
      },
      ItemName: {
        title: 'E-mail',
        type: 'string',
      },
      UOMName: {
        title: 'Age',
        type: 'number',
      },
      UsedByTime: {
        title: 'Age',
        type: 'number',
      },
      BuildToQuantity: {
        title: 'Age',
        type: 'number',
      },
      LocationName: {
        title: 'Age',
        type: 'number',
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();

  lineItems: any[];
  constructor(
    private lineItemService: PrepLineItemService) {
      this.lineItemService.getJSON()
      .subscribe((lineItems: any[]) => {
        this.lineItems = lineItems;
        this.source.load(this.lineItems);
      });
}

  ngOnInit() {
    
  }
}
