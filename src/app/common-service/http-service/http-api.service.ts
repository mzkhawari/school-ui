import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject} from 'rxjs';
import { catchError } from 'rxjs/operators'

import Globals from '../globals'; 
import { Router } from '@angular/router';
import { UserDto } from '../models/web-site/user.dto';
import { ToastMessageService } from '../service/toast-message.service';
import { ErrorModel } from './model/error-model.dto';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  public currentUserSubject: BehaviorSubject<UserDto>;
  private currentUser!: Observable<UserDto>;
  constructor( 
    private http :HttpClient,
    private router: Router,
    private toastMessageService: ToastMessageService  ) {
      let data = localStorage.getItem('currentUser');
      if(data!==undefined && data!== ""){
        this.currentUserSubject = new BehaviorSubject<UserDto>(JSON.parse(data));
        this.currentUser =  this.currentUserSubject.asObservable();
      }else{
        this.currentUserSubject = new BehaviorSubject<UserDto>(new UserDto(0));
      }
    }
  
    setCurrentUserSubject(userJson: string){
      this.currentUserSubject = new BehaviorSubject<UserDto>(JSON.parse(userJson));
      return this.currentUserSubject;    
    }


  private trimUrl(url: string ){
    if(!url.endsWith('/'))
    url +='/';        
    return url;
  };
  
  private getJsonHttpHeaders() {
    let accessToken:string ="";
    if( this.currentUserSubject !==undefined &&
        this.currentUserSubject.value !==undefined &&
        this.currentUserSubject.value.token !==undefined &&
        this.currentUserSubject.value.token.accessToken !==undefined){
          accessToken = this.currentUserSubject.value.token.accessToken
        }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,x-custom-header',
      'Access-Control-Allow-Methods': 'PUT,POST,DELETE,GET,OPTIONS',
      'Authorization': `Bearer ${ accessToken } `, //${ accessToken }
    });
  }

  private getPOSTJsonHttpHeaders() {
    let accessToken :string ="";
    if( this.currentUserSubject !==undefined &&
      this.currentUserSubject.value !==undefined &&
      this.currentUserSubject.value.token !==undefined &&
      this.currentUserSubject.value.token.accessToken !==undefined){
        accessToken = this.currentUserSubject.value.token.accessToken
      }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,x-custom-header',
      'Authorization': `Bearer ${ accessToken } `, //${ accessToken }
    });
  }

  private getFileHttpHeaders(keyValue?:any) {
    let accessToken :string ="";
    if( this.currentUserSubject !==undefined &&
      this.currentUserSubject.value !==undefined &&
      this.currentUserSubject.value.token !==undefined &&
      this.currentUserSubject.value.token.accessToken !==undefined){
        accessToken = this.currentUserSubject.value.token.accessToken
      }

    let headers = new HttpHeaders({
      //'Content-Type': 'multipart/form-data',
      //'Accept': 'application/json',
      //'cache': 'false',
      //'contentType': 'false',
      //'processData': 'false',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${ accessToken }`, //
    });
    if(keyValue!==undefined){
      for(let i=0;i < keyValue.Length ;i++){
        headers.append(keyValue[i].Key, keyValue[i].Value)
      }
    }

    return  headers;
  }

  private getLoginHttpHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json-patch+json',
      'accept': '*/*'
    });
  }




  

  get<T>(url:string):Observable<T>{
      return this.http.get<T>(Globals.urlServer + url, {headers: this.getJsonHttpHeaders()}).pipe(
        //  // retry(3), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
        );       
  };

  getByModel<T>(url:string, searchModel?:any):Observable<T>{
    
    return this.http.post<T>(Globals.urlServer + url, searchModel , {headers: this.getJsonHttpHeaders() }).pipe(
      //  // retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );    
  };
  
  post<T>(url: string , data?: any) : Observable<any>{
    return this.http.post<T>(Globals.urlServer + url, data, { headers: this.getPOSTJsonHttpHeaders()})    
     .pipe(
     //  // retry(3), // retry a failed request up to 3 times
       catchError(this.handleError) // then handle the error
     );
  }

  put<T>(url: string , data?: any) : Observable<any>{
    return this.http.put<T>(Globals.urlServer + url, data, { headers: this.getJsonHttpHeaders()})    
     .pipe(
     //  // retry(3), // retry a failed request up to 3 times
       catchError(this.handleError) // then handle the error
     );
  }  

  postFormData<T>(url: string , data?: FormData) : Observable<any>{
    return this.http.post<T>(Globals.urlServer + url, data, { headers: this.getFileHttpHeaders()})    
     .pipe(
     //  // retry(3), // retry a failed request up to 3 times
       catchError(this.handleError) // then handle the error
     );
  }
  
  postHeaderData<T>(url: string , data?: any) : Observable<any>{
    return this.http.post<T>(Globals.urlServer + url, data, { headers: this.getFileHttpHeaders(data)})    
     .pipe(
     //  // retry(3), // retry a failed request up to 3 times
       catchError(this.handleError) // then handle the error
     );
  }

  delete<T>(url: string, id:number): Observable<any>{
    return this.http.delete<any>(Globals.urlServer+ url+ id, {headers: this.getJsonHttpHeaders()})
    .pipe(
      // retry(3), // retry a failed request up to 3 times
       catchError(this.handleError) // then handle the error
     );
  }
  
  login(url: string , data?: any) : Observable<any>{    
     
    return this.http.post(Globals.urlServer + url + "login", data)
    .pipe(
     // retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  activate(url: string , data?: any) : Observable<any>{
    return this.http.post(Globals.urlServer + url , data)
    .pipe(
      // retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  } 








  getDataByQueryString(url:string, UrlMethod?:string , data?: string):Observable<any>{
     
    return this.http.get(Globals.urlServer + url + UrlMethod + data).pipe(
      // retry(3), // retry a failed request up to 3 times
       catchError(this.handleError) // then handle the error
     );
  };


  getDataValue(url:string, UrlMethod?:string , data?: any):Observable<any>{
     
    return this.http.post(Globals.urlServer + url + UrlMethod, data).pipe(
      // retry(3), // retry a failed request up to 3 times
       catchError(this.handleError) // then handle the error
     );
  };

  logout(url: string , data?: any) : Observable<any>{
    localStorage.removeItem('loadChart');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    return this.http.post(Globals.urlServer + url + "logout", data)
    .pipe(
     // retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
    
  } 

  refreshToken(url: string , data?: any) : Observable<any>{
    return this.http.post(Globals.urlServer + url + "refreshToken", data) ;
    //حذف pipe بخاطر اینکه بتوان در در صورت ولید نبودن بفرسته به login

  } 


  private handleError(error: HttpErrorResponse) {
     
    let errorModel = new ErrorModel();
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      errorModel.Status = 0;
      errorModel.Message = error.error.message;                    
      return throwError(errorModel);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      
      console.log(error);
      var err:any = error;      
      var errors:any=[];
      if (err.status === 400) {
        let errorMessage ='';
        let validationErrorDictionary = err.error.ModelState ;
        for (var fieldName in validationErrorDictionary) {
            if (validationErrorDictionary.hasOwnProperty(fieldName) && fieldName !== "$id") {
                errors.push({filed: fieldName , error: validationErrorDictionary[fieldName].join()});
                errorMessage +=`${fieldName}: ${validationErrorDictionary[fieldName].join()} `;
            }
        } 
        if(errorMessage == ''){
          errorMessage = err.error;          
        }
        errorModel.Message = errorMessage;
        errorModel.Status =400;
        errorModel.OrginError = error;        
        return throwError(errorModel);
      }else if (err.status === 401) {
        if(err.message.includes("api/auth/sign-in")){
          errorModel.Status =401;
          errorModel.OrginError = error;        
          errorModel.Message = "لطفا با یوزر و پسورد صحیح وارد شوید."; 
          throwError(errorModel);
        }
        if(err.message.includes("api/auth/refreshToken")){
          errorModel.Status =401;
          errorModel.OrginError = error;              
          errorModel.Message ="لطفا دوباره وارد شوید، ورود شما اکسپایر شده است."    
          return throwError(errorModel);
        }else{
          errorModel.Status =401;
          errorModel.Message = "لطفا دوباره وارد شوید، ورود شما اکسپایر شده است."                    
          throwError(errorModel);  
        } 
        //this.router.navigateByUrl('auth/sign-in');        
        //return;       
        //return err;// throwError(err.message);
      }else if (err.status === 500) {
        if(err.error.ExceptionMessage !==undefined){
          errorModel.Status =500;
          errorModel.Message = err.error.ExceptionMessage;                    
          return throwError(errorModel);
        }
        else if(err.error.Message !==undefined){
          errorModel.Status =500;
          errorModel.Message = err.error.Message;                    
          return throwError(()=> errorModel)
        }
        else if(err.error.key!==undefined){
          errorModel.Status =500;
          errorModel.Message = err.error.key.join();                    
          return throwError(errorModel);
        }
        else if(err.error!==undefined){
          errorModel.Status =500;
          errorModel.Message = err.error;                    
          return throwError(errorModel);
        }
      }else if (err.status === 404) {
        errorModel.Status =404;
        errorModel.Message =  err.message;// "Request Fail!, Not Found Error!";                    
        return throwError(errorModel);          //err.message)
      }         
      else {
         errors.push("something went wrong!");
      }
      errorModel.Status =500;
      errorModel.Message = error.message ;// "Unkown Error, Please Call to Admin!";                    
      return throwError(errorModel);
    };
  }
}
