import { HttpClient } from '@angular/common/http'; 
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cacheable } from 'ngx-cacheable';
import { InventoryChart, InventoryChartData } from './inventory-chart';
import { PeriodsService } from './periods.service';
import { MathService } from './math.service';
import { JsonPipe } from '@angular/common';

@Injectable()
export class InventoryChartService extends InventoryChartData {
 private data = { };  
 private inventoryData; 
 private _jsonURL = '../../../Data/SalesData.csv';
 constructor(private http: HttpClient,private period: PeriodsService,private mathService: MathService) {
  super();  
  this.data = {
        week: this.getDataForWeekPeriod(),
      };   
 }
 
 getInventoryChartData(period: string): InventoryChart {
  return this.data[period];
}

 public async getInventoryDataJSON() {
   return await  this.http.get('assets/SalesData.csv',{ responseType: 'text' }).toPromise();
 }

 
 public async getBuData(inv_id:any){ 
  return await this.getInventoryDataJSON().then(data => {
        this.inventoryData=this.csvToJSON(data,null).filter(
          data => data.inventory_item_id === "1000144");
       });      
 }

 private wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
  }
 }

 private csvToJSON(csv, callback) {
  var lines = csv.split('\n');
  var result = [];
  var headers = lines[0].split("\t");
  for (var i = 1; i < lines.length - 1; i++) {
      var obj = {};
      var currentline = lines[i].split("\t");
      for (var j = 0; j < headers.length; j++) {
        if(j==8)
        {
          obj["day_of_week"] = currentline[j];
        }
        else
        {
          obj[headers[j]] = currentline[j];
        }          
      }
      result.push(obj);
  }
  if (callback && (typeof callback === 'function')) {
      return callback(result);
  }
  return result;
}

 public async getDataForWeekPeriod() {
     await this.getBuData("1000144");
    //var splitData=this.csvToJSON(this.inventoryData,null);
    var buData = this.inventoryData.filter(
      data => data.inventory_item_id === "1000144");
    return {
      chartLabel: this.period.getWeeks(),
      linesData: this.mathService.AvgGroupedData(buData,function(item)
      {
        return [item.day_of_week];
      }).map(x=>x.value)
    }
 }

 public async getFullData() {
  await this.getBuData("1000144");
 //var splitData=this.csvToJSON(this.inventoryData,null);
 var buData = this.inventoryData.filter(
   data => data.inventory_item_id === "1000144");
 return {
   chartLabel: buData.map(a=>a.business_date),
   linesData: buData.map(x=>x.sales_qty)
 }
}

public async get2YearsData() {
  await this.getBuData("1000144");
 //var splitData=this.csvToJSON(this.inventoryData,null);
 var Year20162017 = this.inventoryData.filter(
   data => data.inventory_item_id === "1000144" && new Date(data.business_date)>=new Date("2016-06-13") && new Date(data.business_date)<=new Date("2017-06-13") );

   var Year20172018 = this.inventoryData.filter(
    data => data.inventory_item_id === "1000144" && new Date(data.business_date)>=new Date("2017-06-13") && new Date(data.business_date)<=new Date("2018-06-13") );

 return {
   chartLabel: Year20172018.map(a=>a.business_date),
   linesData: Year20172018.map(x=>x.sales_qty),
   lines2Data:Year20162017.map(x=>x.sales_qty),
 }
}

public async get2MonthsData() {
  await this.getBuData("1000144");
 //var splitData=this.csvToJSON(this.inventoryData,null);
 var Year20162017 = this.inventoryData.filter(
   data => data.inventory_item_id === "1000144" && new Date(data.business_date).getFullYear()==2016 && new Date(data.business_date).getMonth()==9);

   var Year20172018 = this.inventoryData.filter(
    data => data.inventory_item_id === "1000144" && new Date(data.business_date).getFullYear()==2017 && new Date(data.business_date).getMonth()==9);

 return {
   chartLabel: Year20172018.map(a=>a.business_date),
   linesData: Year20172018.map(x=>x.sales_qty),
   lines2Data:Year20162017.map(x=>x.sales_qty),
 }
}



//  private getDataForPlot(): InventoryChart {
//    var buData=this.getBuData(1000144);
//   return {
//     chartLabel: buData.business_date,
//     linesData: this.mathService.AvgGroupedData(buData,function(item)
//     {
//       return [item.day_of_week];
//     }).map(x=>x.value)
//   }
//  }

 ngOnInit() {
 }
}