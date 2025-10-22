import { Component, enableProdMode, Input, OnInit, Output,EventEmitter, ViewEncapsulation, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { getPersianPaginatorIntl } from 'app/common-module/common-component-dev/grid-mat-helper/persian-paginator-intl';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-grid-image',
    templateUrl: './app-grid-image.component.html',
    styleUrls:['./app-grid-image.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: MatPaginatorIntl, useValue: getPersianPaginatorIntl() }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations,
})
export class AppGridImageComponent {

    model : any;
    allPages :string = "allPages";
    checkBoxesMode :string = "checkBoxesMode";

    _datasource: any[] =[];
    get datasource(): any[] {
        return this._datasource;
    }
    @Input() set datasource(value: any[]) {
        if(value !==undefined && value.length >0){
            this.isLoading =false;
        }
        let that = this;
        setTimeout(()=>{ that.isLoading=false; },10000)
        this._datasource = value;
        this.dataSource = new MatTableDataSource(this._datasource);
    }

    @Output() OnAddItem : EventEmitter<any> = new EventEmitter(); 
    @Output() OnEditItem : EventEmitter<any> = new EventEmitter(); 
    @Output() OnDeleteItem : EventEmitter<any> = new EventEmitter(); 

    
    dataSource:any;

    isLoading:boolean =true;
    constructor(     public translate: TranslateService) {         
       
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

    OnAdd(){
        this.OnAddItem.next();
    }

    OnEdit(value:any){
        if(value !== null){
            this.model = value // value;
        }         
        this.OnEditItem.next(this.model);
    }

    OnDelete(item:any){
        this.model = item ;// item;
        let id = this.model.id;
        this.OnDeleteItem.next(id);
    }
}

