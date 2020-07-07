import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  constructor(private hc:HttpClient,private router:Router) { }
  resetPassword(obj):Observable<any>
  {
    return this.hc.post('/auth/resetpassword',obj)
  }
}
