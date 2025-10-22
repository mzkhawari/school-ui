import { Injectable } from '@angular/core';
import { LoadingComponent } from 'app/common-module/loading-component/loading/loading.component';
import { FinanceAmountDto } from 'app/exchange-module/models/treasury-amount.dto';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreasuryCustomService {


  public addToModel(model: any, models:any[]):Observable<any[]> {
      let modelDatas: FinanceAmountDto[]=[];
      modelDatas = models;
      if(model ==undefined)
      {
        return;
      }else if(model.id ==undefined || model.id ==0)
      {
        model.id = models.length +1;
        modelDatas.push(model); 
      }else if(model.id>0){
        let index = modelDatas.findIndex(f=>f.id==model.id);                         
        modelDatas[index]=model;
      }else{
        modelDatas.push(model); 
      }
      model = new FinanceAmountDto();
      model.isCash = true;
      return of(modelDatas);
    }  
}
