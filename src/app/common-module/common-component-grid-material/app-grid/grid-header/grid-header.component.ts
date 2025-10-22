import { Component, enableProdMode, Input, OnInit, Output,EventEmitter, ViewEncapsulation, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
//import { ImportDataFormComponent } from '../../import-data-form/import-data-form.component';
import { DxDataGridComponent } from 'devextreme-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'grid-header',
    templateUrl: './grid-header.component.html',
})
export class GridHeaderComponent {

    @Input() title:string ="" ;
    @Input() subTitle:string =this.translate.instant('the-list-is-displayed-as-follows') ;
    @Input() isAddButton:boolean =false ;
    @Input() isBackButton:boolean =true ;
    @Input() isExportButton:boolean =false ;
    @Input() isImportButton:boolean =false ;
    @Input() isSearchBox:boolean =false;
    @Input() isCloseButton:boolean =false ;
    @Input() returnUrlAddress:string ="/index-info" ;

    @Output() OnAddItem : EventEmitter<any> = new EventEmitter(); 
    @Output() OnTextFilter : EventEmitter<any> = new EventEmitter(); 
    @Output() OnExportItem : EventEmitter<any> = new EventEmitter(); 
    @Output() OnImportItem : EventEmitter<any> = new EventEmitter(); 
    
    isLoading:boolean=false;
    constructor(public translate: TranslateService, public dialogRef: MatDialog, private router: Router ) {         
    }

    OnAdd(){
        this.OnAddItem.next();
    }

    OnBack(){
        this.router.navigateByUrl(this.returnUrlAddress)
    }

    OnExport(){

        
        this.OnExportItem.next();
    }

    OnImport(){
        // const activeModal = this.dialogRef.open(ImportDataFormComponent);
        // activeModal.componentInstance.OnSave.subscribe((receivedEntry) => {
        //     this.OnImportItem.next(receivedEntry);
        //     activeModal.close();
        // });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.OnTextFilter.emit(filterValue);
    }
}

