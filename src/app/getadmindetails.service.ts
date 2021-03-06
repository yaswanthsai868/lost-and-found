import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetadmindetailsService {

  constructor(private http:HttpClient) { }
  
  getName(username):Observable<any>
  {
    return this.http.get('/admin/name/'+username)
  }
}
