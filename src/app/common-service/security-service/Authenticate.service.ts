import { Injectable, InjectionToken } from '@angular/core';
import { HttpApiService } from '../http-service/http-api.service'; 
import { Observable, of, BehaviorSubject} from 'rxjs';
import { map, tap, mapTo, catchError, switchMap } from 'rxjs/operators';
import Globals from '../globals';
import { Router } from '@angular/router';
import { HttpRequest, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { NbToastStatus, ToastMessageService } from '../service/toast-message.service';
//  
import { UserDto } from '../models/web-site/user.dto';
import { TokenDto } from '../models/web-site/token.dto';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { BranchDto } from 'app/branch-module/models/branch.dto';
export declare const NB_AUTH_TOKEN_INTERCEPTOR_FILTER: InjectionToken<(req: HttpRequest<any>) => boolean>;
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService  {
 
  private baseUrl :string ="";
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly USER_NAME = 'USER_NAME';
  private readonly USER_ROLE_NAME = 'USER_ROLE_NAME';
  private readonly BRANCH_NAME = 'BRANCH_NAME';
  

  loggedUser:string ="";
  constructor(
      private router: Router,
      private httpApi: HttpApiService, 
      private toastMessageService : ToastMessageService,
      private _httpClient: HttpClient,
      private _userService: UserService ) {
    this.baseUrl = Globals.UrlAuth;
   }
  
  login( data?: any) : Observable<any>{
   
    return this.httpApi.login(this.baseUrl ,data ).pipe(
      tap(tokens => this.doLoginUser(data.username, tokens)),
      map(res => {
         
        debugger;
        var user = res as UserDto;
        // login successful if there's a jwt token in the response
         console.log(`user:${user}`);
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes      
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.storeBranchInfo(user.branchInfo);
            this.storeTokens(user.token);
            let dataUser = localStorage.getItem('currentUser');
            if(this.httpApi.currentUserSubject ==undefined || this.httpApi.currentUserSubject ==null){
              let userSubject = this.httpApi.setCurrentUserSubject(JSON.stringify(dataUser));
              userSubject.next(user);
            }else{
              this.httpApi.setCurrentUserSubject(JSON.stringify(dataUser));
            }
          }
        return user;
      }),
      catchError(error => {
        
        let msg = error.Message!==undefined ? error.Message : error ;
        this.toastMessageService.showToast(NbToastStatus.WARNING, "Warning", msg);
        //alert(error);
        return of(false);
      }));
  } 

  postDataValue(urlMethod?: string) : Observable<any>{
    var userName = 'admin';
    var pass = 'admin';
    var coop = 'Noor';
    var model = {CooperateId: coop, Username : userName, Password: pass };
    return this.httpApi.getDataValue(this.baseUrl, urlMethod, model);
  }
  
  getDataValue2(baseApi:string, urlMethod?: string, value?:string) : Observable<any>{    
    return this.httpApi.getDataByQueryString(baseApi, urlMethod, value);
  }

  logout() {
     var model = {
          'refreshToken': this.getRefreshToken(),
          'userName': this.getUserName(),
          };
    return this.httpApi.post(`${this.baseUrl}logout`, model).subscribe(res=>{
      this.doLogoutUser();
      var status = res as boolean;
        // login successful if there's a jwt token in the response
        if (status) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //this.toastMessageService.showToast(NbToastStatus.INFO,"Log Out","Success Log Out");
            localStorage.setItem('currentUser', '');
            this.removeTokens();
            this.httpApi.currentUserSubject.next(new UserDto());
            //window.location.reload();
            this.router.navigateByUrl('auth/sign-in');
          }
          return null;
    }, err=>{
        if(err.status==401){
          this.router.navigateByUrl('auth/sign-in');
          }
          else if(err.status==500){
            this.toastMessageService.showToast(NbToastStatus.DANGER, "Error", "خطا در پشتیبان گیری");            
            //this.toastMessageService.showToast(NbToastStatus.DANGER, "Error", err.ExceptionMessage);
          }
          this.router.navigate(['/auth/sign-out']);
    });          
 }  

  // public get currentUserValue(): UserDto {
  //   if(this.httpApi.currentUserSubject!==null)
  //       return this.httpApi.currentUserSubject.value;
  //   else 
  //       return new UserDto(0);
  // }

  public get currentUserValue(): UserDto {
     
    let dataUser = localStorage.getItem('currentUser');
    console.log(`this.httpApi.currentUserSubject:${this.httpApi.currentUserSubject}`);
    console.log(`ocalStorage.getItem:${dataUser}`);
    if(this.httpApi.currentUserSubject!==null){
      if(dataUser !==undefined || dataUser !==null){
        let currentUserSubject1 = new BehaviorSubject(JSON.parse(dataUser));
        let value = this.httpApi.currentUserSubject.value;
        if(value && value.id !== undefined && value.id > 0){
          return value
        }
      }      
    }
    if(dataUser!==undefined){
      let userValue = JSON.parse(dataUser);
      return (userValue as UserDto)
    }
    return new UserDto();
  }

  public get currentAccessToken(): string {
    if(this.httpApi.currentUserSubject  && 
       this.httpApi.currentUserSubject.value!==undefined &&
       this.httpApi.currentUserSubject.value.token!==undefined &&
       this.httpApi.currentUserSubject.value.token.accessToken!==undefined )
        return this.httpApi.currentUserSubject.value.token.accessToken;
    else
        return "";        
  }
  
  public getToken(): string {
    return this.getJwtToken();
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
  public collectFailedRequest(request:any): void {
      this.cachedRequests.push(request);
    }
  public retryFailedRequests(): void {
      // retry the requests. this method can
      // be called after the token is refreshed
    }


    getJwtToken() {
      let value = localStorage.getItem(this.JWT_TOKEN);
      if(value!==undefined)
        return value;
      else
        return "";
    }
  
    private doLoginUser(username: string, tokens: TokenDto) {
      this.loggedUser = username;
      this.storeTokens(tokens);
    }
  
    private doLogoutUser() {
      this.removeTokens();
      this.loggedUser = "";
      localStorage.removeItem('currentUser');
      localStorage.removeItem('loadChart');
      this.httpApi.currentUserSubject.next(new UserDto());
    }


    refreshToken11() {
      let token = this.getRefreshToken();
      if(token ==null)
      this.router.navigateByUrl('auth/sign-in');
      return this.httpApi.refreshToken(this.baseUrl, {
        'refreshToken': token,
        'userName' : this.getUserName()
      }).pipe(tap((tokens: TokenDto) => {
        if(tokens.accessToken!==undefined){
          this.storeJwtToken(tokens.accessToken);
        }
        this.storeTokens(tokens);
       }),catchError(err => {
         if(err.status==401){
          //this.toastMessageService.showToast(NbToastStatus.INFO,"Update","Please login again!");
          localStorage.setItem('currentUser', '');
          this.removeTokens();
          this.httpApi.currentUserSubject.next(new UserDto());
          this.router.navigateByUrl('auth/sign-in');
          }
          console.log(err)
          return of(false);
        }));
       
      //  .subscribe(res =>{
      //   let tokens  = res as TokenDto
      //   this.storeJwtToken(tokens.accessToken);
      //   this.storeTokens(tokens);
      // },error=>{
      //   var err = error as HttpErrorResponse;
      //   if(err.status == 401){
      //     this.router.navigate(["/auth/resreshToken"]);
      //   }
      // })
      
       
    }

    private getRefreshToken() {
       
      return localStorage.getItem( "refreshToken");// this.REFRESH_TOKEN);
    }

    getUserName() {
      return localStorage.getItem(this.USER_ROLE_NAME);
    }

    getUserRoleTitle() {
      return localStorage.getItem(this.USER_ROLE_NAME);
    }

    getBranchInfo() {
      return localStorage.getItem(this.BRANCH_NAME);//  this.USER_NAME);
    }

    getUserName2() {
      return localStorage.getItem(this.USER_NAME);
    }

    private storeJwtToken(jwt: string) {
      localStorage.setItem(this.JWT_TOKEN, jwt);
    }
  
    private storeTokens(tokens: TokenDto) {      
      localStorage.setItem(this.JWT_TOKEN, tokens.accessToken==undefined ? "": tokens.accessToken);
      localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken==undefined ?"": tokens.refreshToken );
      localStorage.setItem(this.USER_NAME, (tokens.userName==undefined ? "": tokens.userName));
    }

    public storeBranchInfo(item: BranchDto) {      
      localStorage.setItem(this.BRANCH_NAME, JSON.stringify(item));
    }

    public setUserRoleTitle(item:string) {
      localStorage.setItem(this.USER_ROLE_NAME, item);
    }

    public storeTokens2(tokens: TokenDto) {
      localStorage.setItem(this.JWT_TOKEN, tokens.accessToken==undefined ? "": tokens.accessToken);
      localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken==undefined ?"": tokens.refreshToken );
      localStorage.setItem(this.USER_NAME, (tokens.userName==undefined ? "": tokens.userName));
    }

    private removeTokens() {
      localStorage.removeItem(this.JWT_TOKEN);
      localStorage.removeItem(this.REFRESH_TOKEN);
      localStorage.removeItem(this.USER_NAME);
      localStorage.removeItem(this.BRANCH_NAME);
      localStorage.removeItem('loadChart');
      localStorage.setItem(this.JWT_TOKEN, "");
      localStorage.setItem(this.REFRESH_TOKEN , "");
      localStorage.setItem(this.USER_NAME, "");
    }



    accessToken:string ="";
    refreshToken:string ="";
    _authenticated:boolean=false;
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
    
    signInUsingToken(): Observable<any>
    {
        // Renew token
        return this.httpApi.post(Globals.UrlRefreshtoken, {
          refreshToken: this.refreshToken,
          accessToken: this.accessToken,
          userName :''
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                this.refreshToken = response.refreshToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }
}


//export declare const defaultAuthOptions: any;
// export declare const NB_AUTH_OPTIONS: InjectionToken<NbAuthOptions>;
// export declare const NB_AUTH_USER_OPTIONS: InjectionToken<NbAuthOptions>;
// export declare const NB_AUTH_STRATEGIES: InjectionToken<[NbAuthStrategyClass, NbAuthStrategyOptions][]>;
// export declare const NB_AUTH_TOKENS: InjectionToken<NbAuthTokenClass<NbAuthToken>[]>;
// export declare const NB_AUTH_INTERCEPTOR_HEADER: InjectionToken<string>;
