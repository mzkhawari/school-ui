import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(private router:Router)
    {
       // router.navigateByUrl('/index-info')
        //translate.addLangs(['en', 'tr']);  
        //translate.setDefaultLang('en');  
    }    
}
