import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../../modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   return this.authService.accessTokenSubject.asObservable()
     .pipe(
       take(1),
       switchMap(token => {
         const clonedRequest = request.clone({
           setHeaders: {
             'Authorization': `Bearer ${token}`
           }
         });
         return next.handle(clonedRequest)
           .pipe(
              // map(event => event instanceof HttpResponse),
             catchError((err) => {
               console.log(err);
               if (err instanceof HttpErrorResponse && err.status === 401) {
                 localStorage.clear();
                 this.router.navigate(['auth', 'signin']);
               }
               return of(err);
             })
           )
          ;
       })
     );
  }
}
