import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReturnrejectService {

  constructor(private http:HttpClient) { }
  doReturn(userObj):Observable<any>
  {
    return this.http.post('/user/acceptexchange',userObj)
  }
  doReject(userObj):Observable<any>
  {
    return this.http.post('/user/rejectexchange',userObj)
  }
  resendOtp(userObj):Observable<any>
  {
    return this.http.post('/user/resendexchangepassword',userObj)
  }
}
