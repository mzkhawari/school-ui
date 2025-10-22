import { Injectable } from '@angular/core';
import { HttpApiService } from '../http-service/http-api.service'; 
import { Observable, of, BehaviorSubject} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import Globals from '../globals';
import { Router } from '@angular/router';
import { HttpRequest } from '@angular/common/http';
import { UserDto } from '../models/web-site/user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthOldService  {
 
  private baseUrl :string ="";

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string ="";

  constructor(private router: Router,  private httpApi: HttpApiService ) {
    this.baseUrl = Globals.UrlAuth;
   }
  
  login(url: string , data?: any) : Observable<any>{
    return this.httpApi.login( this.baseUrl ,data ).pipe(map(res => {
      var person = res as UserDto;
      // login successful if there's a jwt token in the response
      if (person && person.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(person));
          this.httpApi.currentUserSubject.next(person);
          this.router.navigate(['/index-info']);
      }
        return person;
      }));
  } 

//   logout() {
//     // remove user from local storage to log user out
//     localStorage.removeItem('currentUser');
//     localStorage.removeItem('loadChart');
//     this.httpApi.currentUserSubject.next(new UserDto());
//     this.router.navigateByUrl('auth/sign-in');    
//  }  

  public get currentUserValue(): UserDto {
    return this.httpApi.currentUserSubject.value;
  }

  public get currentAccessToken(): string {
    if(this.httpApi.currentUserSubject.value!==undefined &&
       this.httpApi.currentUserSubject.value.token!==undefined &&
       this.httpApi.currentUserSubject.value.token.accessToken!==undefined)
        return this.httpApi.currentUserSubject.value.token.accessToken;
    else
        return "";
  }
  
  public getToken(): string {
    if(this.httpApi.currentUserSubject.value!==undefined &&
      this.httpApi.currentUserSubject.value.token!==undefined &&
      this.httpApi.currentUserSubject.value.token.accessToken!==undefined)
        return this.httpApi.currentUserSubject.value.token.accessToken;
    else
        return "";
  }
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    if(token!=="")
        return  true;//tokenNotExpired(null, token);
    else
        return false;    
  }
  cachedRequests: Array<HttpRequest<any>> = [];
  public collectFailedRequest(request): void {
      this.cachedRequests.push(request);
    }
  public retryFailedRequests(): void {
      // retry the requests. this method can
      // be called after the token is refreshed
    }

    
   
  
}
