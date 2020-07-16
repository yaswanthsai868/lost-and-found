import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadfounditemService {

  constructor(private http:HttpClient) { }
  uploadItem(foundObj):Observable<any>
  {
    return this.http.post('/user/uploadfounditem',foundObj)
  }
}
