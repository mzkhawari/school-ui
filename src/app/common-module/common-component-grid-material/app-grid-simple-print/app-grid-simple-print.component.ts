import { Component, Input, Output,EventEmitter, ViewEncapsulation, AfterViewInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { getPersianPaginatorIntl } from 'app/common-module/common-component-dev/grid-mat-helper/persian-paginator-intl';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-grid-simple-print',
    templateUrl: './app-grid-simple-print.component.html',
    styleUrls:['./app-grid-simple-print.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: MatPaginatorIntl, useValue: getPersianPaginatorIntl() }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations,
})
export class AppGridSimplePrintComponent {

    model : any;
    allPages :string = "allPages";
    checkBoxesMode :string = "checkBoxesMode";

    rowAlternation:boolean = true;

    _datasource: any[] = [] ;
    get datasource(): any[] {
        return this._datasource;
    }
    @Input() set datasource(value: any[]) {
        if(value !==undefined && value.length >0){
            this.isLoading =false;
        }
        let that = this;
        this._datasource = value;
        this.changeDetection.markForCheck(); 
    }

    _columns: any[] =[] ;
    get columns(): any[] {
        return this._columns;
    }
    @Input() set columns(value: any[]) {        
        this._columns = value;
        this.displayedColumns = this.columns.filter(f=>f.dataField !== undefined && f.dataField !== 'Id').map(function(a) { return a.dataField ;});
        this.isLoading =false;
    }

    @Input()
    summeryCol:any;

    @Output() OnEditItem : EventEmitter<any> = new EventEmitter(); 
    @Output() OnDeleteItem : EventEmitter<any> = new EventEmitter(); 

    displayedColumns: string[] = [];// ['position', 'name', 'weight', 'symbol'];    
    
    dataSource:any;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild('tableSort') tableSort = new MatSort();
  

    isLoading:boolean =true;
    searchInputControl: FormControl = new FormControl();
    constructor(    public translate: TranslateService,private changeDetection: ChangeDetectorRef ) {         
       
    }

    applyFilter(value: any) {
        this.dataSource.filter = value.trim().toLowerCase();
    }

    getChildValue(parentObject:any, filed :string){
        if(parentObject!==undefined)
            return parentObject[filed];
        else
            return "";    
    }

    OnEdit(value:any){
        if(value !== null){
            this.model = value.row.data // value;
        }         
        this.OnEditItem.next(this.model);
    }

    OnDelete(item:any){
        this.model = item.row.data ;// item;
        let id = this.model.id;
        this.OnDeleteItem.next(id);
    }

    OnRowPrepared(e) {  
        if (e.rowType !=="data")  
            return ;                
         
        if (e.data !=undefined && (e.data.amountPos ==0 || e.data.amountNeg ==0)) {  
            e.data.value ='';
        }
    }
}

