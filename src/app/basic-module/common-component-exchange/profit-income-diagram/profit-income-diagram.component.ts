import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastStatus, ToastMessageService } from  '../../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../../common-service/service/base-crud.service';
import Globals from '../../../common-service/globals';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profit-income-diagram',
  templateUrl: './profit-income-diagram.component.html',
  styleUrls:['./profit-income-diagram.component.css']
})

export class ProfitIncomeDiagramComponent implements OnInit {

  dataSource : any=[];
  ArgumentField : string="";
  Series : any[]=[];
  title :string ="";
  titleChart :string ="";
  constructor(
              private translate:TranslateService,
              private crudService: BaseCrudService, 
              private toastMessageService: ToastMessageService) {      
                this.Series=[];
  }

  @ViewChild('titleReport') titleReport: HTMLElement;
  ngOnInit() {
    
     
    this.title =this.translate.instant('current-month-income');
    this.titleChart = "";
    this.Series.push({ valueField : "countFromAmount", name :this.translate.instant('remittance-commission')});// this.translate.instant('home-page.char.send') });
    this.Series.push({ valueField : "countToAmount", name :this.translate.instant('conversion-provisions')}); // this.translate.instant('home-page.char.recieve') });
    setTimeout(()=>{
      this.get();
    },1000);
  }

  onSelectItem($event){
    this.get();
  }

  branches:any[]=[];
  branchId:number  =0;
  isSuperAdmin:boolean = true;
  avgSend:number =0;
  isFirstSending:boolean = false;
  private get(){

    this.dataSource = [];

      
    this.crudService.getDataUrl(Globals.UrlTransactionReport, `GetMonthProfitDiagrams/${this.branchId}`).subscribe(res=>{       
      const data = res ;
      this.dataSource = data.data;
      this.ArgumentField = data.argumentField ;    
      this.branches = data.branch;
      this.isSuperAdmin = data.isSuperAdmin; 
      
      //this.avgSend = this.dataSource.reduce((sum, current) => sum + current.countFrom, 0)/this.dataSource.length;
    },
    error =>{
      this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
    });
  }
}
