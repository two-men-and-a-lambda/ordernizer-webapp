import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { ProductInventory } from '../models/ProductInventory';
import { map } from 'rxjs/operators';
import { Table } from '../models/table';

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
  getTable(table: string): Observable<Table[]> {
    return this.http
      .get(`${this.serviceUrl}get_${table}`)
      .pipe<Table[]>(map((data: any) => data));
  }

  postInventory(inventory: ProductInventory[]): Observable<ProductInventory[]> {
    let data: any={};
    inventory.forEach((function (row) {
      let key = row['product'] as string
      let val = Number(row['units_remaining'])
      data[key] = val
    }))
    data['timestamp'] = new Date();
    let body = JSON.stringify(data);
    return this.http.post<ProductInventory[]>(`${this.serviceUrl}submit_inventory`, body);
  }

  postSale(inventory: ProductInventory[]): Observable<ProductInventory[]> {
    let data: any={};
    inventory.forEach((function (row) {
      let key = row['product'] as string
      let val = {"price": Number(row['sale']), "units": Number(row['secondary'])};
      data[key] = val
    }))
    data['timestamp'] = new Date();
    let body = JSON.stringify(data);
    return this.http.post<ProductInventory[]>(`${this.serviceUrl}submit_sale`, body);
  }

  postShipment(inventory: ProductInventory[]): Observable<ProductInventory[]> {
    let data: any={};
    inventory.forEach((function (row) {
      let key = row['product'] as string
      let val = {"price": Number(row['shipment']), "units": Number(row['ship_secondary'])};
      data[key] = val
    }))
    data['timestamp'] = new Date();
    let body = JSON.stringify(data);
    return this.http.post<ProductInventory[]>(`${this.serviceUrl}submit_order`, body);
  }
    /**{"bananas": 20, "apples": 23, "timestamp": "2023-01-30 04:25:01"}**/


















































}
