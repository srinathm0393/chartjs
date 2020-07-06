import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {
  constructor(private httpClient: HttpClient) { }

  getAdvantageData(): Observable<any>{
    return this.httpClient.get('assets/revenue.json');
  }
}
