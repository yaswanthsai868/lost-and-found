import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteuserService {

  constructor(private http:HttpClient) { }
  removeUser(username):Observable<any>
  {
    let userObj={}
    userObj['username']=username
    return this.http.post('/admin/deleteaccount',userObj)
  }
}
