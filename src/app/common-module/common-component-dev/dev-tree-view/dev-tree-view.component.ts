import { NgModule, Component, enableProdMode, Input, OnInit, Output,EventEmitter, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';


@Component({
    selector: 'app-dev-tree-view',
    templateUrl: './dev-tree-view.component.html',
    styleUrls:[ './dev-tree-view.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DevTreeViewComponent implements OnInit {
   
    allPages:any;
    @Input() datasource : any;
    @Input() columns : any =[];
    

    @Output() OnSectedValue : EventEmitter<number[]> = new EventEmitter(); 

    @ViewChild('list') el:ElementRef;
    constructor( ) {
        //window.console.log(this.datasource)      
    }
    ngOnInit(){

    }    


    selectionChangedData(value:any){
        let data = this.el.nativeElement.selectedItemKeys
        console.log(data);
        this.OnSectedValue.next(data);
    }
}

