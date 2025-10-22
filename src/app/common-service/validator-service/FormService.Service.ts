import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormService {

  // get all values of the formGroup, loop over them
  // then mark each field as touched
  public markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if(control!==undefined){
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({onlySelf:true});
      }
      if (control instanceof FormGroup) {             //{4}      
        this.markFormGroupTouched(control);            //{6}
      }
    });
  }

  // return list of error messages
  public validationMessages() {
    const messages = {
      required: 'Field is Required!',
      email: 'The Email is not correct!',
      postalCode: 'The PostalCode is not correct!',
      min:'At Least',
      max:'حداکثر عدد',
      validateEqual:(value:any)=>{
        return `فیلد  "${value.fromControl}" باید با فیلد "${value.toControl}" یکسان باشد .`;
      },
      validateGreater:(value:any)=>{
        return `فیلد  "${value.fromControl}" باید بزرگتر از فیلد "${value.toControl}"  باشد .`;
      },
      validateGreaterEqual:(value:any)=>{
        return `فیلد  "${value.fromControl}" باید بزرگتر یا مساوی از فیلد "${value.toControl}"  باشد .`;
      },
      validateGreaterDate:(value:any)=>{
        return `فیلد  "${value.fromControl}" باید بزرگتر از فیلد "${value.toControl}"  باشد .`;
      },      
      validateSmaller:(value:any)=>{
        return `فیلد  "${value.fromControl}" باید کوچکتر از فیلد "${value.toControl}"  باشد .`;
      },
      validateSmallerEqual:(value:any)=>{
        return `فیلد  "${value.fromControl}" باید کوچکتر یا مسای از فیلد "${value.toControl}"  باشد .`;
      },
      minlength:(value:any)=>{
        return `حداقل کاراکتر${value.requiredLength}`;
      },
      maxlength:(value:any)=>{
        return `حداکثر کاراکتر${value.requiredLength}`;
      },
      validateMinValue:(value:any)=>{
        return `حداقل عدد ${value.minimumValue}`;
      },
      validateMaxValue:(value:any)=>{
        return `حداکثر عدد ${value.maximumValue}`;
      },
      invalid_characters: (matches: any[]) => {
        let matchedCharacters = matches;
        matchedCharacters = matchedCharacters.reduce((characterString, character, index) => {
          let string = characterString;
          string += character;
          if (matchedCharacters.length !== index + 1) {
            string += ', ';
          }
          return string;
        }, '');

        return `این کاراکترها اجازه استفاده ندارند: ${matchedCharacters}`;
      },
    };
    return messages;
  }

  // Validate form instance
  // check_dirty true will only emit errors if the field is touched
  // check_dirty false will check all fields independent of
  // being touched or not. Use this as the last check before submitting
  public validateForm(formToValidate: FormGroup, formErrors: any, checkDirty?: boolean) {
    const form = formToValidate;

    for (const field in formErrors) {
      if (field) {
        formErrors[field] = '';
        const control = form.get(field);
        const messages = this.validationMessages();
        if (control && !control.valid) {
          if (!checkDirty || (control.dirty || control.touched)) {
            for (const key in control.errors) {
              if (key && (key=='minlength' || key=='maxlength') ) {
                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
              }else if(key=='validateEqual'){
                formErrors[field] = formErrors[field] || messages[key](control.errors);                
              }else if(key=='validateGreater'){
                formErrors[field] = formErrors[field] || messages[key](control.errors);                
              }else if(key=='validateGreaterEqual'){
                formErrors[field] = formErrors[field] || messages[key](control.errors);                
              }else if(key=='validateGreaterDate'){
                formErrors[field] = formErrors[field] || messages[key](control.errors);                
              }
              else if(key=='validateSmaller'){
                formErrors[field] = formErrors[field] || messages[key](control.errors);                
              }
              else if(key=='validateSmallerEqual'){
                formErrors[field] = formErrors[field] || messages[key](control.errors);                
              }
              else if(key=='validateMaxValue'){
                formErrors[field] = formErrors[field] || messages[key](control.errors);                
              }
              else if(key=='validateMinValue'){
                formErrors[field] = formErrors[field] || messages[key](control.errors);                
              }      
              else if(key=='validateSelected'){
                formErrors[field] = formErrors[field] || messages[key](control.errors);                
              }              
              else if(key === 'invalid_characters') {
                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
              }else{
                formErrors[field] = formErrors[field] || messages[key];
              }
            }
          }
        }
      }
    }
    return formErrors;
  }
}