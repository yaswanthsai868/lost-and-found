import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GettransactionsService {

  constructor(private http:HttpClient) { }

  getTransactions():Observable<any>
  {
    return this.http.get('/admin/exchanges')
  }
}
