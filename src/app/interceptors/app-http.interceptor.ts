import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("*****");
    console.log(req.url);

    // Check if the URL does not include "auth/login"
    if (!req.url.includes("auth/login")) {
      // Clone the request to add the new header
      let newRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.authService.accessToken)
      });
      // Pass the cloned request instead of the original request to the next handle
      return next.handle(newRequest);
    } else {
      return next.handle(req);
    }
  }
}
