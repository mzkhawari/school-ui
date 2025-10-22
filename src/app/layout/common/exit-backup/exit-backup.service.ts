import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Message } from 'app/layout/common/messages/messages.types';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class MessagesService
{
    private _messages: ReplaySubject<Message[]> = new ReplaySubject<Message[]>(1);

    /**
     * Constructor
     */
    constructor(
        
        private _httpClient: HttpClient)
    {
    }

    
}
