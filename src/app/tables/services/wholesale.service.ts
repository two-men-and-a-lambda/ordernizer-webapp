import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { ProductInventory } from '../models/ProductInventory';
import { map } from 'rxjs/operators';
import { Table } from '../models/table';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class WholeSaleService {
  private serviceUrl = 'https://f0nk1usvg2.execute-api.us-east-1.amazonaws.com/';

  constructor(private http: HttpClient, private authService: AuthService) { }
  getTotals(): Observable<ProductInventory[]> {
    let user = this.authService.getUserID()
    let urlString = `${this.serviceUrl}table?user=${user}`
    return this.http
      .get(urlString)
      .pipe<ProductInventory[]>(map((data: any) => data.totals));
  }
  getTable(table: string): Observable<Table[]> {
    let user = this.authService.getUserID()
    let urlString = `${this.serviceUrl}get_${table}?user=${user}`
    return this.http
      .get(urlString)
      .pipe<Table[]>(map((data: any) => data));
  }

  postInventory(inventory: ProductInventory[]): Observable<ProductInventory[]> {
    let user = this.authService.getUserID()
    let urlString = `${this.serviceUrl}submit_inventory?user=${user}`

    let data: any = {};
    inventory.forEach((function (row) {
      let key = row['product'] as string
      let val = Number(row['units_remaining'])
      data[key] = val
    }))
    data['timestamp'] = new Date();
    let body = JSON.stringify(data);
    return this.http.post<ProductInventory[]>(urlString, body);
  }

  postShipment(inventory: ProductInventory[]): Observable<ProductInventory[]> {
    let user = this.authService.getUserID()
    let urlString = `${this.serviceUrl}submit_order?user=${user}`
    let data: any = {};
    inventory.forEach((function (row) {
      let key = row['product'] as string
      if (!row['shipmentQuantity'] == null) {
        let val = { "price": Number(row['shipmentPrice']), "units": Number(row['shipmentQuantity']), "date": row['shipmentDate'] };
        data[key] = val
      }

    }))
    data['timestamp'] = new Date();
    let body = JSON.stringify(data);
    return this.http.post<ProductInventory[]>(urlString, body);
  }

  postSale(inventory: ProductInventory[]): Observable<ProductInventory[]> {
    let user = this.authService.getUserID()
    let urlString = `${this.serviceUrl}submit_sale?user=${user}`
    let data: any = {};
    inventory.forEach((function (row) {
      let key = row['product'] as string
      if (!row['saleQuantity'] == null) {
        let val = { "price": Number(row['salePrice']), "units": Number(row['saleQuantity']), "date": row['saleDate'] };
        data[key] = val
      }

    }))
    data['timestamp'] = new Date();
    let body = JSON.stringify(data);
    return this.http.post<ProductInventory[]>(urlString, body);
  }
  /**{"bananas": 20, "apples": 23, "timestamp": "2023-01-30 04:25:01"}**/


















































}
