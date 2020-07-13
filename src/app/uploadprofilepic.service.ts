import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadprofilepicService {

  constructor(private http:HttpClient) { }
  uploadImage(formObj):Observable<any>
  {
    return this.http.post('/user/uploadprofilepic',formObj)
  }
}
