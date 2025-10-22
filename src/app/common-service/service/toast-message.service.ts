import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
//import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
//import 'style-loader!angular2-toaster/toaster.css';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
//import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService implements OnInit {

  constructor(private _snackBar: MatSnackBar,
    private _fuseConfirmationService: FuseConfirmationService,
    private _formBuilder: FormBuilder) {   //private toastr: ToastrService  

    this.configForm = this._formBuilder.group({
      title: 'حذف ردیف',
      message: 'آیا شما موافق حذف کردن ردیف هستید؟? <span class="font-medium"></span>',
      icon: this._formBuilder.group({
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'warn'
      }),
      actions: this._formBuilder.group({
        confirm: this._formBuilder.group({
          show: true,
          label: 'حذف',
          color: 'warn'
        }),
        cancel: this._formBuilder.group({
          show: true,
          label: 'کنسل'
        })
      }),
      dismissible: true
    });

    this.configFormPassword= this._formBuilder.group({
      title: ' ',
      message: '? <span class="font-medium"></span>',
      icon: this._formBuilder.group({
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'warn'
      }),
      actions: this._formBuilder.group({
        confirm: this._formBuilder.group({
          show: true,
          label: 'بله',
          color: 'warn'
        }),
        cancel: this._formBuilder.group({
          show: true,
          label: 'خیر'
        })
      }),
      dismissible: true
    });

   
  }

  
  configFormPassword:FormGroup;
  configForm: FormGroup;
  configFormConfirm: FormGroup;
  ngOnInit(): void {

  }






  //config: ToasterConfig;
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  //position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbToastStatus = NbToastStatus.SUCCESS;

  title = 'هشدار';
  content = `لطفا به خطا توجه کنید!`;


  // positions: string[] = [
  //   NbGlobalPhysicalPosition.TOP_RIGHT,
  //   NbGlobalPhysicalPosition.TOP_LEFT,
  //   NbGlobalPhysicalPosition.BOTTOM_LEFT,
  //   NbGlobalPhysicalPosition.BOTTOM_RIGHT,
  //   NbGlobalLogicalPosition.TOP_END,
  //   NbGlobalLogicalPosition.TOP_START,
  //   NbGlobalLogicalPosition.BOTTOM_END,
  //   NbGlobalLogicalPosition.BOTTOM_START,
  // ];

  showToast(type: NbToastStatus, title: string, body: string) {
    const titleContent = title ? `${title}` : '';
    this.index += 1;
    this._snackBar.open(body, "", { duration: 3000, panelClass: 'my-custom-snackbar' });
    // if(type==NbToastStatus.SUCCESS)      
    // else if (type==NbToastStatus.DANGER || type==NbToastStatus.WARNING)
    //   this._snackBar.open(body,null);
    // else if(type==NbToastStatus.INFO || type==NbToastStatus.DEFAULT || type==NbToastStatus.PRIMARY  )
    //   this._snackBar.open(body,null);
  }


  confirmDelete() {
    // Open the dialog and save the reference of it
    const dialogRef = this._fuseConfirmationService.open(this.configForm.value);
    // Subscribe to afterClosed from the dialog reference
    return dialogRef.afterClosed();
  }

  confirmRestPassword() {
    const dialogRef = this._fuseConfirmationService.open(this.configFormPassword.value);
    return dialogRef.afterClosed();
  }



  confirmMessage(title:string) {

    this.configFormConfirm = this._formBuilder.group({
      title: 'تایید',
      message: `${title}  <span class="font-medium"></span>`,
      icon: this._formBuilder.group({
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'warn'
      }),
      actions: this._formBuilder.group({
        confirm: this._formBuilder.group({
          show: true,
          label: 'تایید',
          color: 'warn'
        }),
        cancel: this._formBuilder.group({
          show: true,
          label: 'کنسل'
        })
      }),
      dismissible: true
    });
    const dialogRef = this._fuseConfirmationService.open(this.configFormConfirm.value);    
    return dialogRef.afterClosed();
  }





}


export enum NbToastStatus {
  DEFAULT,
  DANGER,
  INFO,
  PRIMARY,
  SUCCESS,
  WARNING,
};

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
     
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}