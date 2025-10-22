import { NgModule, Component, enableProdMode, Input, OnInit, Output,EventEmitter, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'dev-dropdown-grid',
    templateUrl: './dev-dropdown-grid.component.html',
    styleUrls: ['./dev-dropdown-grid.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DevDropDownGridComponent implements OnInit {
   
    public model : any;
    @Input() titleFiled : string=this.translate.instant('select-from-list');
    @Input() dataSource : any;
    @Input() columns : any =[];
    @Input() selectedValue : string[] =[];
    @Input() isMultiple : number= 0;
    @Input() selectedId : number[]= [];
    @Input() isArrowSelect : boolean= true;

    multipleDopdownGrid: any ={ mode: 'single' } ;

    @Output()
    OnGridBoxValueSelected: EventEmitter<number> =  new EventEmitter();
    @Output()
    OnGridBoxValueList: EventEmitter<number[]> =  new EventEmitter();
    //selectedValueId: number=0;

    @Output()
    OnValueChange: EventEmitter<number[]> =  new EventEmitter();
 

    _gridBoxValue: any = 0;
    _gridSelectedRowKeys: any[] = [];
    _displayValue:string = "";

    constructor(public translate: TranslateService) {         

    }

    selectedData:any=[];
    ngOnInit(){
        console.log("grid- isMultiple:") 
        console.log(this.isMultiple)     
        if(this.isMultiple==1)
        {
            this.multipleDopdownGrid ={ mode: 'multiple' };
            this.isArrowSelect = false;
        }else{
            this.multipleDopdownGrid = { mode: 'single' }; 
        }
    }    

    onValueChanged($event:number){
         
        let value :any = $event;
        this.OnValueChange.emit(value);
    }
  
    set gridBoxValue(value: number) {        
        this._gridSelectedRowKeys = value && [value] || [];
        this._gridBoxValue = value;
        this.OnGridBoxValueSelected.next(value);        
    }

    get gridBoxValue(): any {
        if(this.dataSource !==undefined){
            var item = this.dataSource.filter((f: { Id: any; })=>this._gridBoxValue == f.Id);//[]
            if(item!==undefined){                
                var displayItem = [];
                if(this.selectedValue !== null && this.selectedValue.length>0){
                    for(var i=0; i<this.selectedValue.length; i++){
                        displayItem.push(item[this.selectedValue[i]]);                
                    }
                }
                 this._displayValue = displayItem.join(' ');
                 return  this._gridBoxValue;
            }
            this._displayValue='0';
            return this._gridBoxValue;
        }        
    }

    get gridSelectedRowKeys(): number[] {
        return this._gridSelectedRowKeys;
    }

    set gridSelectedRowKeys(value: number[]) {        
        this._gridBoxValue = value.length && value[0] || null;
        this._gridSelectedRowKeys = value;
        this.OnGridBoxValueList.next(this.gridSelectedRowKeys);
        this.OnGridBoxValueSelected.next(this.gridSelectedRowKeys[0])
    }
    
    gridBox_displayExpr(item:any){ 
        return item && item.DiaplayValue;     
    }   


    setPerviousItem(){
         
        if(this.isMultiple==0){
            let item = this._gridSelectedRowKeys[0]
            let itemIndex = this.dataSource.findIndex((f: { Id: any; })=>f.Id == item);
            if(itemIndex > 0){
                this._gridSelectedRowKeys = [this.dataSource[itemIndex-1].Id];
            }
        }
    }

    setNextItem(){
         
        if(this.isMultiple==0){
            let item = this._gridSelectedRowKeys[0]
            let itemIndex = this.dataSource.findIndex((f: { Id: any; })=>f.Id == item);
            if(itemIndex < this.dataSource.length){
                this._gridSelectedRowKeys= [this.dataSource[itemIndex+1].Id];
            }
        }
    }
}