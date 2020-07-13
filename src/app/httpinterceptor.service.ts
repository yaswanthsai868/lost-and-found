import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token=localStorage.getItem('token')
    if(token==null)
    {
      return next.handle(req)
    }
    else
    {
      let modifiedReq=req.clone({headers:req.headers.set('Authorization','Bearer '+token)})
      return next.handle(modifiedReq)
    }
  }
}
