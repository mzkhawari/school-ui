import { Component, OnInit } from '@angular/core';
import { BaseCrudService } from '../../../common-service/service/base-crud.service';
import Globals from '../../../common-service/globals';
import { PeriodTypeDto } from '../../../common-service/models/Base/period-type.dto';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shortcutkey-menu',
  templateUrl: './shortcutkey-menu.component.html',
  styleUrls:['./shortcutkey-menu.component.css']
})

export class ShortcutkeyMenuComponent implements OnInit {

  private baseUrlApi : string = "";

    constructor(public translate: TranslateService, private crudService: BaseCrudService) {      
  }

  ngOnInit() {

  }

  private get(){
    this.crudService.postAdd(Globals.UrlAboutUs,{}).subscribe(res=>{       
      const data = res ;
    },
    error =>{
      //this.toastMessageService.showToast(NbToastStatus.DANGER, "خطای سرور ", error.Message);
    });
  }  

  OnSave(model: PeriodTypeDto){
    var id = model.Id;
    let resultPromise:any;
    if(id==0 || id== undefined)
      resultPromise = this.crudService.postAdd(this.baseUrlApi,model);
    else
      resultPromise = this.crudService.putData(this.baseUrlApi,model,id)  
      resultPromise.subscribe(res=>{
        if(res){
          //this.toastMessageService.showToast(NbToastStatus.SUCCESS, "پیام موفقیت " , "با موفقیت اضافه ثبت شد")      
        }else{
          //this.toastMessageService.showToast(NbToastStatus.DANGER, "پیام خطا " , "خطای ناشناخته")      
        }
      },error =>{
          //this.toastMessageService.showToast(NbToastStatus.DANGER, "خطای سرور ", error.Message);        
      },
      () => {
      });
  }
}
