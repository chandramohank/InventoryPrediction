import { HttpClient } from '@angular/common/http'; 
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { groupBy } from 'rxjs/operators';

@Injectable()
export class MathService {

     public GroupBy(array , f) {
        return array.reduce(function(l, r) {
            // construct a unique key out of the properties we want to group by
            var key = JSON.stringify( f(r) );
          
            // check if the key is already known
            if (typeof l[key] === "undefined") {
              // init with an "empty" object
              l[key] = {
                sum: 0,
                count: 0
              };
            }
            
            // sum up the values and count the occurences
            l[key].sum += parseInt(r.sales_qty);
            l[key].count += 1;
          
            return l;
          }, {}); 
        }

    public AvgGroupedData(array , f){
        var groupedData= this.GroupBy(array,f);
        return Object.keys(groupedData)
        // iterate over the elements in <groupedData> and transform them into the "old" format
        .map(function(key) {
         var keyElements=JSON.parse(key);
          // construct the "old" format including the average value
          return {
            key: key,
            value: (groupedData[key].sum / groupedData[key].count)
          };
        });
    }
}