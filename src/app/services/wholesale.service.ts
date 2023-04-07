import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { ProductInventory } from '../model/ProductInventory';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WholeSaleService {
  private serviceUrl = 'https://f0nk1usvg2.execute-api.us-east-1.amazonaws.com/';

  constructor(private http: HttpClient) {}
  getTotals(): Observable<ProductInventory[]> {
    return this.http
      .get(`${this.serviceUrl}table`)
      .pipe<ProductInventory[]>(map((data: any) => data.totals));
  }

  postInventory(inventory: ProductInventory[]): Observable<ProductInventory[]> {
    let data: any={};
    inventory.forEach((function (row) {
      let key = row['product'] as string
      let val = row['units_remaining']
      data[key] = val
    }))
    data['timestamp'] = new Date();
    let body = JSON.stringify(data);
    return this.http.post<ProductInventory[]>(`${this.serviceUrl}submit_inventory`, body);
  }
    /**{"bananas": 20, "apples": 23, "timestamp": "2023-01-30 04:25:01"}**/


















































}
