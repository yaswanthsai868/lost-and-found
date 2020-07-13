import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisteradminService {

  constructor(private hc:HttpClient) { }
  doRegister(obj):Observable<any>
  {
    return this.hc.post('/admin/addaccount',obj)
  }
}
