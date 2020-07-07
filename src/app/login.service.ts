import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {observable, Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private hc:HttpClient) { }

  doUserLogin(username,password):Observable<any>
  {
    let obj:object={};
    obj['username']=username
    obj['password']=password
    return this.hc.post('/user/login',obj)
  }
  doAdminLogin(username,password):Observable<any>
  {
    let obj:object={};
    obj['username']=username
    obj['password']=password
    return this.hc.post('/admin/login',obj)
  }
}
