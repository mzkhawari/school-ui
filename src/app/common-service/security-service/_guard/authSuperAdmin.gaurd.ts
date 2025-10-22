import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticateService } from '../Authenticate.service';

@Injectable({ providedIn: 'root' })
export class AuthSuperAdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthenticateService,
        ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        console.log(state.url);
        if(this.authService.isAuthenticated()){
            
        }
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/sign-in'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
