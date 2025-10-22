import { NgModule, Component, enableProdMode, Input, OnInit, Output,EventEmitter, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'grid-footer-print',
    templateUrl: './grid-footer-print.component.html',
    styleUrls:[ './grid-footer-print.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class GridFooterPrintComponent implements OnInit {
   
    @Input()
    dataSource : any;

    constructor( public translate: TranslateService) {
      this.dataSource = {};
    }
    ngOnInit(){
      console.log("dataSource:")
      console.log(this.dataSource);
    }    
}

