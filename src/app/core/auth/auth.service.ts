import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { AuthenticateService } from 'app/common-service/security-service/Authenticate.service';
import { HttpApiService } from 'app/common-service/http-service/http-api.service';
import Globals from 'app/common-service/globals';
import { NbToastStatus, ToastMessageService } from 'app/common-service/service/toast-message.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private httpApi: HttpApiService, 
        private _httpClient: HttpClient,
        private authenticateService: AuthenticateService,
        private toastMessageService: ToastMessageService,
        private _userService: UserService
    )
    {
    }




    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    set refreshToken(token: string)
    {
        localStorage.setItem('refreshToken', token);
    }

    get refreshToken(): string
    {
        return localStorage.getItem('refreshToken') ?? '';
    }

    set currentUser(token: string)
    {
        localStorage.setItem('currentUser', token);
    }

    get currentUser(): string
    {
        return localStorage.getItem('currentUser') ?? '';
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn( username: string, password: string ): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            //location.href = "/#/index-info";
            //return throwError('کاربر گرامی شما قبلا وارد شده اید.');
        }
         
        let model = { UserName : username, Password: password };
        return this.httpApi.login(Globals.UrlAuth, model).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.token.accessToken;
                this.refreshToken = response.token.refreshToken;
                this.currentUser = JSON.stringify(response);
                // Set the authenticated flag to true
                this._authenticated = true;
                this.authenticateService.storeTokens2(response.token);
                this.authenticateService.storeBranchInfo(response.branchInfo);
                this.authenticateService.setUserRoleTitle(response.userRoleTitle);
                // Store the user on the user service
                this._userService.user = response;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        // Renew token
        return this.httpApi.post(Globals.UrlRefreshtoken, {
            refreshToken: this.refreshToken,
            accessToken: this.accessToken,
            userName:''
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

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('loadChart');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
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

    logout() {
        var model = {
             'refreshToken': this.refreshToken,
             'userName': '',
             };
       return this.httpApi.post(`${Globals.UrlAuth}logout`, model).subscribe(res=>{
         var status = res as boolean;
           // login successful if there's a jwt token in the response
           if (status) {
               // store user details and jwt token in local storage to keep user logged in between page refreshes
               this.toastMessageService.showToast(NbToastStatus.INFO,"Exit","You SignOut!");
               localStorage.setItem('currentUser', '');
               this.signOut();
               this.httpApi.currentUserSubject.next(null);
             }
             return null;
       }, err=>{
           
       });
     }
}
