import { Component, Input, Output, EventEmitter, ViewEncapsulation, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActionType } from '../models/action-type';
import { GridService } from './grid.service';
import { Observable, of } from 'rxjs';
import { IActionEmitter } from '../models/action-emitter';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { State } from './IState';
import { SortableHeader, SortEvent } from '../directives/sortable.directive';
import Globals from 'app/common-service/globals';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-grid-paging',
    templateUrl: './app-grid-paging.component.html',
    styleUrls: ['./app-grid-paging.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppGridPagingComponent {

    model: any;
    @Input() isView: boolean = false;
    @Input() linkMng: string = "";
    @Input() title: string = "";
    @Input() baseUrl: string = Globals.urlServer;
    @Input() actions: ActionType[] = [
        { isShow: false }, 
        { isShow: true, icon: "feather-edit btn-edit" }, 
        { isShow: true, icon: 'feather-trash btn-delete' }, 
        { isShow: false }, 
        { isShow: false }, 
        { isShow: false }
    ];

    rowAlternation: boolean = true;

    _data: any[] = [];
    get data(): any[] {
        return this._data;
    }
    @Input() set data(value: any[]) {
        this._data = value || [];
        this.dataSource$ = of(this._data);
        this.service.loadRequest = false;
    }

    _dataCount: number = 0;
    get dataCount(): number {
        return this._dataCount;
    }
    @Input() set dataCount(value: number) {
        this._dataCount = value;
        this.total$ = of(value);
    }

    _columns: any[] = [];
    get columns(): any[] {
        return this._columns;
    }
    @Input() set columns(value: any[]) {
        this._columns = value || [];
        this.displayedColumns = this.columns
            .filter(f => f.dataField != undefined && f.dataField != 'Id')
            .map(a => a.dataField);
        this.isLoading = false;
    }

    @Input() actionList: ActionType[] = [];
    @Output() OnActionItem: EventEmitter<IActionEmitter> = new EventEmitter();
    @Output() OnPageItem: EventEmitter<State> = new EventEmitter();

    displayedColumns: string[] = [];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) tableSort = new MatSort();

    dataSource$!: Observable<any[]>;
    total$!: Observable<number>;
    isLoading: boolean = true;
    searchInputControl: FormControl = new FormControl();

    // 🔸 حالت کارت موبایل
    isCardView: boolean = false;

    constructor(
        public translate: TranslateService,
        private router: Router,
        public service: GridService
    ) {
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this.dataSource$ = of(this.data);
                this.OnPageItem.next(this.service.state);
            }
            if (event instanceof NavigationError) {
                console.log(event.error);
            }
        });
    }

    // 🔹 تغییر حالت نمایش کارت/جدول
    toggleCardView() {
        this.isCardView = !this.isCardView;
    }

    loadPageBySearch() {
        if (this.service.searchTerm.length >= 2 || this.service.searchTerm.length == 0) {
            this.OnPageItem.next(this.service.state);
            this.service.loadRequest = true;
        }
    }

    loadPage() {
        this.OnPageItem.next(this.service.state);
        this.service.loadRequest = true;
    }

    OnActionEmitter(value: any, index: number) {
        const result: IActionEmitter = {
            data: value,
            index: index
        };
        this.OnActionItem.next(result);
    }

    @ViewChildren(SortableHeader) headers!: QueryList<SortableHeader>;
    onSort({ column, direction }: SortEvent | any) {
        this.headers.forEach((header: any) => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });
    }

    get visibleColumns(): any[] {
        return this.columns ? this.columns.filter(c => c.visible !== false) : [];
    }
}
