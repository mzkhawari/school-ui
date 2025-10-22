import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_shared/authentication.service';
import { Router } from '@angular/router';
import { AuthenticateService } from '../security-service/Authenticate.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticateService: AuthenticateService, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.authenticateService.logout();
            }            
            const error = err.error.Message || err.statusText;
            return throwError(error);
        }))
    }
}