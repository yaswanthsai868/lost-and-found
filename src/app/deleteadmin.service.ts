import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteadminService {

  constructor(private http:HttpClient) { }
  removeAdmin(username):Observable<any>
  {
    let adminObj={}
    adminObj['username']=username
    return this.http.post('/admin/removeaccount',adminObj)
  }
}
