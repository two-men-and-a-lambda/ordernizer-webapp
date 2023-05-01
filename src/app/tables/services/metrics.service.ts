import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  private serviceUrl = 'https://f0nk1usvg2.execute-api.us-east-1.amazonaws.com/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getSalesChartData(lookback: string, periodUnit: string): Observable<any>{
    let user = this.authService.getUserID()
    let urlString = `${this.serviceUrl}chart?user=${user}`
    let data: any = {'lookback': lookback, 'periodUnit':periodUnit};
    let body = JSON.stringify(data);

    return this.http.post<any>(urlString, body);

  }


















































}
