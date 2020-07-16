import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetuploadeditemsService {

  constructor(private http:HttpClient) { }
  getUploadedItems(userObj):Observable<any>
  {
    return this.http.post('/user/uploadeddetails',userObj)
  }
}
