import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserchangepasswordService {

  constructor(private http:HttpClient) { }
  changeUserPassword(userObj):Observable<any>
  {
    return this.http.post('/auth/changeuserpassword',userObj)
  }
}
