import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
//import { FuseAlertType } from '@fuse/components/alert';
import { TranslateService } from '@ngx-translate/core';
import { NbToastStatus, ToastMessageService } from 'app/common-service/service/toast-message.service';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    styleUrls  : ['./sign-in.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class SignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    // alert: { type: FuseAlertType; message: string } = {
    //     type   : 'success',
    //     message: ''
    // };
    signInForm: FormGroup |undefined;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        public translate: TranslateService,
        private toastMessageService : ToastMessageService,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    )
    {
        this.signInNgForm = new NgForm([],[]);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            username  : ['', [Validators.required]],
            password  : ['', Validators.required],
            rememberMe: ['']
        });
       
        // this._authService.check().subscribe(res=>{
        //     if(res===true){
        //         this._router.navigateByUrl('index-info').then(()=>{
        //             location.reload();
        //         });
        //     }
        // })
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void
    {
        debugger;
        // Return if the form is invalid
        if ( this.signInForm!.invalid )
        {
            return;
        }

        // Disable the form
        this.signInForm!.disable();

        // Hide the alert
        this.showAlert = false;

         
        // Sign in
        let formValue = this.signInForm!.value;
        this._authService.signIn(formValue.username, formValue.password).subscribe(
                (res) => {

                    // Set the redirect url.
                    // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                    // to the correct page after a successful sign in. This way, that url can be set via
                    // routing file and we don't have to touch here.
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                    if(res.currentUser !=undefined && res.currentUser.isResetPassword){
                        this._router.navigateByUrl('/force-reset-password');
                    }else{
                        // Navigate to the redirect url
                        if (!redirectURL) {
                            this._router.navigateByUrl(redirectURL);///   'index-info');
                        } else {
                            this._router.navigateByUrl('/index-info');
                            //location.href = '/#/index-info' ;
                        }
                        //.then(() => {
                        //});
                    }
                },
                (response) => {
                     
                    // Re-enable the form
                    this.signInForm!.enable();

                    // Reset the form
                    this.signInNgForm!.resetForm();

                    // Set the alert
                    // this.alert = {
                    //     type   : 'error',
                    //     message: 'Username Or Password is not Correct!'
                    // };
                     
                    // Show the alert
                    this.showAlert = true;
                    this.toastMessageService.showToast(NbToastStatus.WARNING, "warning" , "Username Or Password is not Correct!")      
                }
            );
    }
}
