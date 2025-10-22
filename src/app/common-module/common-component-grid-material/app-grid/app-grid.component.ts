import { Component, enableProdMode, Input, OnInit, Output, EventEmitter, ViewEncapsulation, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { getPersianPaginatorIntl } from 'app/common-module/common-component-dev/grid-mat-helper/persian-paginator-intl';
import { ActionTypes } from '../models/app-grid-action-type';
import { DxDataGridComponent } from 'devextreme-angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-grid',
    templateUrl: './app-grid.component.html',
    styleUrls: ['./app-grid.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: MatPaginatorIntl, useValue: getPersianPaginatorIntl() }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
})
export class AppGridComponent {

    model: any;
    allPages: string = "allPages";
    checkBoxesMode: string = "checkBoxesMode";

    @Input() title: string = "";    
    @Input() isAdding: boolean = false;
    @Input() isExporting: boolean = false;
    @Input() isCloseButton: boolean = false;
    @Input() isBackButton: boolean = true;
    @Input() isSearching: boolean = false;
    @Input() isImporting: boolean = false;
    @Input() returnUrlAddress: string = "/index-info";
    @Input() actions: ActionTypes = new ActionTypes({ isShow: false }, { isShow: true, icon: "feather-edit btn-edit" }, { isShow: true, icon: 'feather-trash btn-delete' }, { isShow: false }, { isShow: false }, { isShow: false });

    @Input() isHeader: boolean = false;
    @Input() useBackground: boolean = false;
    @Input() isRotateHeader: boolean = false;

    @Input() pageSize:number =10;
    rowAlternation: boolean = true;

    _datasource: any[] = [];
    get datasource(): any[] {
        return this._datasource;
    }
    @Input() set datasource(value: any[]) {
        if (value !== undefined && value.length > 0) {
            this.isLoading = false;
        }
        let that = this;
        setTimeout(() => { that.isLoading = false; }, 10000)
        this._datasource = value;
        this.dataSource = new MatTableDataSource(this._datasource);
        this.dataSource.sort = this.tableSort;
        this.dataSource.paginator = this.paginator;
    }

    _columns: any[] = [];
    get columns(): any[] {
        return this._columns;
    }
    @Input() set columns(value: any[]) {

        this._columns = value;
        this.displayedColumns = this.columns.filter(f => f.dataField !== undefined && f.dataField !== 'Id').map(function (a) { return a.dataField; });
        this.isLoading = false;
    }

    @Output() OnAddItem: EventEmitter<any> = new EventEmitter();
    @Output() OnAddItem2: EventEmitter<any> = new EventEmitter();
    @Output() OnExportItem: EventEmitter<any> = new EventEmitter();
    @Output() OnImportItem: EventEmitter<any> = new EventEmitter();
    @Output() OnEditItem: EventEmitter<any> = new EventEmitter();
    @Output() OnDeleteItem: EventEmitter<any> = new EventEmitter();
    @Output() OnDeleteItem2: EventEmitter<any> = new EventEmitter();
    @Output() OnDetailItem: EventEmitter<any> = new EventEmitter();
    @Output() OnDetailItem2: EventEmitter<any> = new EventEmitter();
    @Output() OnDetailItem3: EventEmitter<any> = new EventEmitter();
    @Output() OnPrintItem: EventEmitter<any> = new EventEmitter();

    displayedColumns: string[] = [];// ['position', 'name', 'weight', 'symbol'];    

    dataSource: any;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild('tableSort') tableSort = new MatSort();


    isLoading: boolean = true;
    searchInputControl: FormControl = new FormControl();
    constructor(    public translate: TranslateService) {

    }

    applyFilter(value: any) {
        this.dataSource.filter = value.trim().toLowerCase();
    }

    getChildValue(parentObject: any, filed: string) {
        if (parentObject !== undefined)
            return parentObject[filed];
        else
            return "";
    }

    OnAdd() {
        this.OnAddItem.next();
    }

    OnAdd2(value: any) {
        if (value !== null) {
            this.model = value.row.data // value;
        }
        this.OnAddItem2.next(this.model);
    }

    @ViewChild(DxDataGridComponent) dataGrid!: DxDataGridComponent;
    OnExport() {
        this.dataGrid.instance.exportToExcel(false);
        //this.OnExportItem.next();
    }

    OnImport($event: any) {
        this.OnImportItem.next($event);
    }

    OnPrint(value: any) {

        if (value !== null) {
            this.model = value.row.data // value;
        }
        this.OnPrintItem.next(this.model);
    }

    OnEdit(value: any) {
        if (value !== null) {
            this.model = value.row.data // value;
        }
        this.OnEditItem.next(this.model);
    }

    OnDelete(item: any) {
        this.model = item.row.data;// item;
        let id = this.model.id;
        this.OnDeleteItem.next(id);
        this.OnDeleteItem2.next(this.model);
    }

    OnDetail(item: any) {
        this.model = item.row.data
        this.OnDetailItem.next(this.model);
    }

    OnDetail2(item: any) {
        this.model = item.row.data
        this.OnDetailItem2.next(this.model);
    }

    OnDetail3(item: any) {
        this.model = item.row.data
        this.OnDetailItem3.next(this.model);
    }


    OnCellPrepared(options: any) {
        if (options.rowType == 'header') {
            //options.cellElement.style.transform = 'rotate(-90deg)';  
            //options.cellElement.style.height = '100px';            
            //options.cellElement.style.width = "50px";     
            //options.cellElement.style.overflow = 'visible';       
            //options.cellElement.style.whiteSpace = 'nowrap';
        }
    }

    // OnRowPrepared(e:any) {  
    //     if(this.useBackground){      
    //         if (e.rowType !=="data")  
    //             return ;            
    //         if ((e.data.Times % 2)==1 ) {  
    //             e.rowElement.style.backgroundColor = "#e8472e";  
    //             e.rowElement.classsName = e.rowElement.className.replace("dx-row-alt", "");  
    //         }  
    //     }

    //     if (e.rowType == 'header' && this.isRotateHeader){  
    //         e.rowElement.style.height = '100px';            
    //     }
    // }  

    OnRowPrepared(e) {

        if (e.rowType !== "data")
            return;

        if (this.useBackground) {

            if (e.data.isExpired == true) {
                this.rowAlternation = false;
                e.rowElement.style.backgroundColor = "#fff3cd";
            }

            if (e.data.transferCashStatus == 1) {
                this.rowAlternation = false;
                e.rowElement.style.backgroundColor = "#fff3cd";
            }
            if (e.data.transferCashStatus == 2) {
                this.rowAlternation = false;
                e.rowElement.style.backgroundColor = "#dda0f1"; //"#d1ecf1";
            }
            if (e.data.transferCashStatus == 4) {
                this.rowAlternation = false;
                e.rowElement.style.backgroundColor = "#d4edda";
            }
            if (e.data.transferCashStatus == 5) {
                this.rowAlternation = false;
                e.rowElement.style.backgroundColor = "#f8d7da";
            }
            if (e.data.transferCashStatus == 0) {
                this.rowAlternation = false;
                e.rowElement.style.backgroundColor = "#fff";
            }
            if (e.data.accountStatus == 1) {
                this.rowAlternation = false;
                e.rowElement.style.backgroundColor = "#fff3cd";
            }
            if (e.data.accountStatus == 2) {
                this.rowAlternation = false;
                e.rowElement.style.backgroundColor = "#d1ecf1";
            }

            if (e.data.financeAmountStatus == 1) {
                this.rowAlternation = false;
                e.rowElement.style.backgroundColor = "#fff3cd";
            }
            if (e.data.financeAmountStatus == 2) {
                this.rowAlternation = false;
                e.rowElement.style.backgroundColor = "#d1ecf1";
            }
            if (e.data.financeAmountStatus == 21) {
                this.rowAlternation = false;
                e.rowElement.style.backgroundColor = "#3498db";
            }
            if (e.data.financeAmountStatus == 3) {
                this.rowAlternation = false;
                e.rowElement.style.backgroundColor = "#f8d7da";
            }
            if (e.data.isRecive !== undefined) {
                if (!e.data.isRecive) {
                    if (e.cells !== undefined && e.cells.length > 0) {
                        if (e.cells[1].cellElement !== undefined) {
                            this.rowAlternation = false;
                            //e.cells[1].cellElement.style.color = "#ff0000";
                            e.cells[2].cellElement.style.color = "#ff0000";
                        }
                    }
                }
                if (e.data.isRecive) {
                    if (e.cells !== undefined && e.cells.length > 0) {
                        if (e.cells[1].cellElement !== undefined) {
                            this.rowAlternation = false;
                            e.cells[1].cellElement.style.color = "#0000ff";
                        }
                    }
                }
            }
        }


    }

    OnContentReady(e: any) {
        setTimeout(function () {
            var scrollable = e.component.getScrollable();
            scrollable.scrollTo(1000);
        }, 0);
    }

    /// برای نمایش در حالت موبایلی نشان داده می شود
    onShowDetailData(item: any) {
        let data = item.row.data,
            dataValue = "";

        let values = this.columns.map((val: any) => {
            dataValue = data[val.dataField];
            if (dataValue !== undefined && dataValue !== null && dataValue !== "")
                return `<tr > <td >${val.caption}: </td> <td >${dataValue} </td></tr>`;
            return "";
        });
        return `<table> ${values} </table>`;
    }
}

