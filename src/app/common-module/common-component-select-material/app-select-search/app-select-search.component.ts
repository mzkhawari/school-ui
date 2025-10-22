import {Component, Output, EventEmitter, OnInit, ViewEncapsulation, Input} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-select-search',
  templateUrl: './app-select-search.component.html',
})
export class AppSelectSearchComponent implements OnInit {
  
  @Input() titleField:string =" "
  @Input() fieldId:string ="td"
  @Input() fieldTitle:string ="title"
  @Input() isDisabled:boolean =false;
  @Input() isAll:boolean =false;
  @Input() isNone:boolean =false;
  //@Input() isValidate:boolean =false;

  @Input() selectedId:number;
  @Output() selectedIdChange = new EventEmitter<number>();
  
  @Output() selectValue = new EventEmitter<number>();

  @Input() validateInput:FormControl;
  @Output() validateInputChange = new EventEmitter<FormControl>();

  selectedValue:number =0;
  _dataSource: any=[];
  get dataSource(): any[] {
      return this._dataSource;
  }
  @Input() set dataSource(value: any[]) {
      this._dataSource = value;
      this.selectFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterValues();
      });
      this.filteredValues.next(this._dataSource.slice());
  }

  selectFormControl = new FormControl('', [Validators.required]);
  setSelect($event){
    let valueId = $event.value;
    this.selectValue.next(valueId);
    this.selectedIdChange.next(valueId);
  }

  constructor(public translate: TranslateService) {
    if(this.validateInput == undefined){
      this.validateInput = new FormControl('', [Validators.nullValidator]); 
    }
  }
    
  ngOnInit(){      

    //this.selectCtrl.setValue(this.dataSource[1]);
    //this.filteredValues.next(this.dataSource.slice()); 
  }

  
  public selectFilterCtrl: FormControl = new FormControl();
  public filteredValues: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  private _onDestroy = new Subject<void>();

  private filterValues() {
    
     
    if (!this.dataSource) {
      return;
    }
    // get the search keyword
    let search = this.selectFilterCtrl.value;
    if (!search) {
      this.filteredValues.next(this.dataSource.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredValues.next(       
      this.dataSource.filter(b => b[this.fieldTitle].toLowerCase().indexOf(search) > -1)        
    );
  }


  onSelect(item:any){
     
    let value = item.value 
    this.selectedIdChange.next(value);
  }
}