import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthenticateService } from '../security-service/Authenticate.service';
import { Observable } from 'rxjs';
import { catchError, switchMap, filter, take, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, public auth: AuthenticateService ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(!request.url.includes("api/Auth/sign-in") && !request.url.includes("api/Auth/refreshToken")){
       request = this.addToken(request);
        // return next.handle(request).pipe(catchError(error=>{
        //     if(error instanceof HttpErrorResponse && error.status===401){
        //         return this.handle401Error(request, next);
        //     } else{
        //         return throwError(error);
        //     } 
        // }));
    }
    else{
        return next.handle(request);
    }
  }
  private addToken(request:HttpRequest<any>){
    return request = request.clone({
      setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
  }

  private addNewToken(request:HttpRequest<any>, token: string){
    return request = request.clone({
      setHeaders: {
          Authorization: `Bearer ${token}`
      }
    });
  }

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    if (!request.url.includes("refreshToken") )  //!this.isRefreshing) {
      {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
  
      return this.auth.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.jwt);
          return next.handle(this.addToken(request));
        })).pipe( tap(()=>{},(err:any)=>{
          if (err instanceof HttpErrorResponse) {
            if (err.status !==401) {
             return;
            }
            this.router.navigateByUrl('auth/sign-in');
          }
        }));  
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addNewToken(request, jwt));
        }));
    }
  }
}