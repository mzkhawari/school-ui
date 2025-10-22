import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import Globals from '../globals';
import { AuthenticateService } from '../security-service/Authenticate.service';
import { UserDto } from '../models/web-site/user.dto';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject!: BehaviorSubject<UserDto>;
    //public currentUser: Observable<PersonDto>;
    baseUrl :string ="";
    constructor(private authService: AuthenticateService) {
        let currentUser = localStorage.getItem('currentUser');
        if(currentUser !==null){
            this.currentUserSubject = new BehaviorSubject<UserDto>(JSON.parse(currentUser));
        }
        //this.currentUser = this.currentUserSubject.asObservable();
        //Globals.currentUser = this.currentUserSubject.asObservable()
        this.baseUrl = Globals.UrlAuth; 
    }

    public get currentUserValue(): UserDto {
        return this.currentUserSubject.value;
    }

    public get currentAccessToken(): string {
        let result:string="";
        if(this.currentUserSubject!==undefined && 
           this.currentUserSubject.value!==undefined &&
           this.currentUserSubject.value.token !==undefined &&
           this.currentUserSubject.value.token.accessToken !==undefined)
        {
            result = this.currentUserSubject.value.token.accessToken;
        }
        return result;
    }

    login(username: string, password: string) {
         
        return this.authService.login({username, password })
            .pipe(map(person => {
                // login successful if there's a jwt token in the response
                if (person && person.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(person));
                    this.currentUserSubject.next(person);
                }
                return person;
            })).subscribe(res => { 
                var person = res as UserDto;
                return person; 
            });
    }

    
}