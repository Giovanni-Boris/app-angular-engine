import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../../environments/environment";

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      setHeaders: {
        'x-api-key': environment.apiKey
      }
    });
    return next.handle(clonedRequest);
  }
}
