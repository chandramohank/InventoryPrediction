import { HttpClient } from '@angular/common/http'; 
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import lineItemsJson from '../../../Data/PrepWorksheetLineItems.json';

@Injectable()
export class PrepLineItemService {
   constructor(private http: HttpClient) {
        // this.getJSON().subscribe(data => {
        //     console.log(data)
        // });
    }

    lineItems: any[];

    public getJSON(): Observable<LineItem[]> {
        // var response= this.http.get("../../../Data/PrepWorksheetLineItems.json")
        // .map((response:any) => response.json())
        // .catch((error:any) => console.log(error));
        // response.subscribe(data=>{
        //     this.lineItems.push(data.data)
        // });
        this.lineItems=lineItemsJson.data;
        
        return observableOf(this.lineItems);
    }
}


interface Response {
    appStatus: number;
    count: number;
    status: number;
    data: LineItem[];
    type: string;
  }

interface LineItem {
    StartDate: Date;
    HoldTime: string;
    TaskName: string;
    PrepTime: string;
    ItemName: string;
    UOMName: string;
    UseByTime: Date;
    BuildToQuantity: number;
    LocationName: string;
  }