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

















































}
