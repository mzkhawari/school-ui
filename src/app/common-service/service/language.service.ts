import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService implements OnInit {

  constructor() {   //private toastr: ToastrService  
  }

  configForm: FormGroup;
  ngOnInit(): void {
  }

  public getActiveLang():string{
     
    let lang = localStorage.getItem('lang');
    if(lang=='' || lang== undefined || lang == null)
        lang ='fa';
    return lang;
  }

  public setActiveLang(lang:string){
    localStorage.setItem('lang' , lang);
  }



}

