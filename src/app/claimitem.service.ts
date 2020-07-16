import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimitemService {

  constructor(private http:HttpClient) { }
  claimItem(Obj):Observable<any>
  {
    return this.http.post('/user/claimItem',Obj)
  }
}
