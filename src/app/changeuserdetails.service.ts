import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeuserdetailsService {

  constructor(private http:HttpClient) { }

  modifyDetails(dataObject):Observable<any>
  {
    return this.http.post('/user/modifydetails',dataObject)
  }
}
