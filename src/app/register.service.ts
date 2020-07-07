import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private hc:HttpClient) { }
  doRegister(obj):Observable<any>
  {
    return this.hc.post('/user/register',obj)
  }
}
