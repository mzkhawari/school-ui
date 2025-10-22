import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormServerErrorMessageService {

  constructor() {

   }

   public checkErrorModelState(errorModel:any):any{
    let errors:any[]=[];
    if (errorModel.status === 400) {                   
    let validationErrorDictionary = errorModel.error.ModelState ;// JSON.parse(err.error());
    for (var fieldName in validationErrorDictionary) {
        if (validationErrorDictionary.hasOwnProperty(fieldName) && fieldName !== "$id") {
            errors.push({filed: fieldName , error: validationErrorDictionary[fieldName].join()});
        }
    }
    let errorList:any = [];
    for(let i=0; i< errors.length; i++){
      errorList.push(errors[i].error);
    }
    return errorList
    }else if(errorModel.status==500){
      console.log(errorModel);
      if(errorModel.error!==null){
        errors.push(errorModel.error.ExceptionMessage);
        return errors;
      } else{
        errors.push(errorModel.message);
        return errors;
      } 
    }    
    else{
      console.error(errorModel);
    }

   }
}
