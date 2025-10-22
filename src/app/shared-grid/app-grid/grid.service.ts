import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortDirection } from '@angular/material/sort';
//import { employeeSortColumn } from 'src/app/shared/directives/sortable.directive';
import { ColumnType } from '../models/column-type';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { State } from './IState';
import { employeeSortColumn } from '../directives/sortable.directive';

interface SearchResult {
  gridData: any[];
  total: number;
}


const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(gridData: any[], column: employeeSortColumn, direction: string): any[] {
  if (direction === '' || column === '') {
    return gridData;
  } else {
    return [...gridData].sort((a: any, b: any) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(data: any, columns: any[], term: string, pipe: PipeTransform) {
  for (let i; i <= columns.length; i++) {
    let value = data[columns[i].title].toLowerCase().includes(term.toLowerCase());
    if (value == true)
      return value;
  }
  if (columns.length == 0)
    return false;
}

@Injectable({ providedIn: 'root' })
export class GridService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _gridData$ = new BehaviorSubject<any[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  public dataValue: any[] = [];
  public columns: ColumnType[] = [];



  private _state: State = {
    page: 1,
    pageSize: 10,
    pageTotal: 0,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.dataValue = [];
      }

      if (event instanceof NavigationEnd) {
        this._search$.pipe(
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search()),
          delay(200),
          tap(() => this._loading$.next(false))
        ).subscribe(result => {
          this._gridData$.next(result.gridData);
          this._total$.next(result.total);
        });
        this._search$.next();
      }

      if (event instanceof NavigationError) {
        console.log(event.error);
      }
    });
  }

  get gridData$() { return this._gridData$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get state() { return this._state; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set loadRequest(val: boolean) { this._loading$.next(val) } 
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: employeeSortColumn) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }


  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  public _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let gridData = sort(this.dataValue, sortColumn, sortDirection);

    // 2. filter
    //gridData = gridData.filter(dataValue  => matches(dataValue, this.columns, searchTerm, this.pipe));
    const total = gridData.length;

    // 3. paginate
    gridData = gridData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ gridData, total });
  }
}
