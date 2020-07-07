import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyotpService {

  constructor(private hc:HttpClient) { }

  verify(obj):Observable<any>
  {
    return this.hc.post('/auth/verifyotp',obj)
  }
}
