import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetuserdetailsService {

  constructor(private http:HttpClient) { }
  getName(username):Observable<any>
  {
    return this.http.get('/user/name/'+username)
  }
}
