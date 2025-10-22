
import { Inject, Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpErrorResponse, HttpClient
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { NbAuthService, NbAuthToken, NbTokenService, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { Router } from '@angular/router';


@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, private router: Router, protected http: HttpClient,
    @Inject(NB_AUTH_TOKEN_INTERCEPTOR_FILTER) protected filter) {
  }

  private handleAuthError(err: HttpErrorResponse): void {
    if (err.status === 401 || err.status === 403) {
      this.authService.logout("email");
      this.router.navigateByUrl(`/auth/sign-in`);
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // do not intercept request whose urls are filtered by the injected filter
    if (!this.filter(req)) {
      return this.authService.isAuthenticated()
        .pipe(
          switchMap(authenticated => {
            if (authenticated) {
              return this.authService.getToken().pipe(
                switchMap((token: NbAuthToken) => {
                  const JWT = `Bearer ${token.getValue()}`;
                  req = req.clone({
                    setHeaders: {
                      Authorization: JWT,
                    },
                  });
                  return next.handle(req).pipe(
                    catchError(response => {
                      if (response instanceof HttpErrorResponse) {
                        this.handleAuthError(response)
                      }
                      return throwError(response);
                    }));
                }),
              )
            } else {
              this.authService.logout("email");
              this.router.navigateByUrl(`/auth/sign-in`);
              return next.handle(req).pipe(
                catchError(response => {
                  if (response instanceof HttpErrorResponse) {
                    this.handleAuthError(response)
                  }
                  return throwError(response);
                }));
            }
          }),
      );
    } else {
      return next.handle(req).pipe(
        catchError(response => {
          if (response instanceof HttpErrorResponse) {
            this.handleAuthError(response)
          }
          return throwError(response);
        }));
    }
  }

  protected get authService(): NbAuthService {
    return this.injector.get(NbAuthService);
  }

}
