import { NgModule, Component, enableProdMode, Input, OnInit, Output,EventEmitter, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'grid-header-person-print',
    templateUrl: './grid-header-person-print.component.html',
    styleUrls:[ './grid-header-person-print.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class GridHeaderPersonPrintComponent implements OnInit {
   
    @Input()
    model : any;
    constructor( public translate: TranslateService) {
    }
    ngOnInit(){
    }    
}

