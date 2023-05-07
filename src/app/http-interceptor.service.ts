import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const clonedRequest = request.clone({ headers: request.headers.append('Authorization',
     `Bearer ${localStorage. getItem('token')}`) });
    

    //console.log(request.headers.get('Authorization'));

  console.log(request.headers.get('Authorization'));
    return next.handle(clonedRequest);
  }


  
}

export const AuthInterceptorProvider = {
  provide : HTTP_INTERCEPTORS,
  useClass : HttpInterceptorService,
  multi : true,
}
