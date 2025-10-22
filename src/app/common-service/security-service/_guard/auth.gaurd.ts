import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticateService } from '../Authenticate.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService:AuthenticateService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
         
        console.log(state.url);   
        if(!this.authService.isAuthenticated()){
             
            this.router.navigateByUrl('auth/sign-in');
        }        
        const currentValue:any = this.authService.currentUserValue;
        let currentUser = currentValue.currentUser
        if (currentUser && currentUser.id  !==undefined ) {
            var accessKeys = currentUser.accessKeys;
            var isAccess = true ;// false;
            if(accessKeys!==null && accessKeys !=undefined){
                let statUrl = state.url.toLowerCase();
                accessKeys.forEach(element => {
                    let value ="";
                    if(element.UrlRequest!==undefined){
                        value = element.UrlRequest.toLowerCase();
                    }
                    if(value !==undefined){
                        if(statUrl.includes(value)){
                            isAccess =true;
                            return;
                        }                
                    }
                });
            }
            if(!isAccess)
                this.router.navigate(['/']);
            return true;    
        }
         
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/sign-in'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
