import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminchangepasswordService {

  constructor(private http:HttpClient) { }
  changeAdminPassword(adminObj):Observable<any>
  {
    return this.http.post('/auth/changeadminpassword',adminObj)
  }
}
