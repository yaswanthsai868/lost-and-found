import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FindlostitemService {

  constructor(private http:HttpClient) { }
  lostItem(lostObj)
  {
    return this.http.post('/user/compareitems',lostObj)
  }
}
