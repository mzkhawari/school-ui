import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/core/auth/auth.service';
import { Router } from '@angular/router';
import { AuthenticateService } from 'app/common-service/security-service/Authenticate.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector     : 'sign-out',
    templateUrl  : './sign-out.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class SignOutComponent implements OnInit
{
    countdown: number = 5;
    countdownMapping: any = {
        '=1'   : '# second',
        'other': '# seconds'
    };

    /**
     * Constructor
     */
    constructor(        
        private _router: Router,
        public translate: TranslateService,
    )
    {
        //localStorage.removeItem('accessToken');
        //localStorage.removeItem('refreshToken');        
    }

    ngOnInit(): void {        
        setTimeout(()=>{
            this._router.navigateByUrl('/auth/sign-in');
        }, 5000)
    }
    
}
