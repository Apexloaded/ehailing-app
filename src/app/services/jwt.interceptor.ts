import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.services';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor  implements HttpInterceptor {
  toastr: any;
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const data = StorageService.getItem('authData');
    if (data) {
      request = request.clone({
        setHeaders: {
          'Content-Type':  'application/json',
          // tslint:disable-next-line: object-literal-key-quotes
          'Authorization': `Bearer ${data.userToken}`,
          'cache-control': 'no-cache',
        }
      });
    }
    return next.handle(request);
  }

}
