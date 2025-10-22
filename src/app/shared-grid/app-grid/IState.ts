import { SortDirection } from "@angular/material/sort";
import { employeeSortColumn } from "../directives/sortable.directive";
//import { employeeSortColumn } from "src/app/shared/directives/sortable.directive";



export interface State {
    page: number;
    pageSize: number;
    pageTotal: number;
    searchTerm: string;
    sortColumn: employeeSortColumn;
    sortDirection: SortDirection;
  }
  