import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordserviceService {

  constructor(private hc:HttpClient) { }

  requestOtp(username):Observable<any>
  {
    let obj={};
    obj['username']=username;
    return this.hc.post('/auth/forgotpassword',obj)
  }
}
