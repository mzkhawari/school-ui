import { NgModule, Component, enableProdMode, Input, OnInit, Output,EventEmitter, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'grid-header-print',
    templateUrl: './grid-header-print.component.html',
    styleUrls:[ './grid-header-print.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class GridHeaderPrintComponent implements OnInit {
   
    @Input()
    dataSource : any= {};

    constructor(public translate: TranslateService) {
      this.dataSource = {};
    }
    ngOnInit(){
      console.log("dataSource:")
      console.log(this.dataSource);
    }    
}

