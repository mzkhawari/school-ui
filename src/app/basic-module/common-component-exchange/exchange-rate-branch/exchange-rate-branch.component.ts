import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastStatus, ToastMessageService } from  '../../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../../common-service/service/base-crud.service';
import Globals from '../../../common-service/globals';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-exchange-rate-branch',
  templateUrl: './exchange-rate-branch.component.html',
  styleUrls:['./exchange-rate-branch.component.css']
})

export class ExchangeRateBranchComponent implements OnInit {

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
    

    this.get();
    setTimeout(()=>{
    },2000);
  }


  
  avgSend:number =0;
  isFirstSending:boolean = false;
  private get(){


     
     this.title = "گزارش حضور و غیاب";// this.translate.instant('transaction-report2');
     this.titleChart = "حضور و غیاب (کلاس ها)";// this.translate.instant('branch-transactions-(representative-offices)');

  
    this.crudService.getDataUrl(Globals.UrlApplicantPersentReport,"GetStudentPresentDiagram").subscribe(res=>{       
      const data = res ;
      this.dataSource = data.data;
      this.ArgumentField = data.argumentField ;     
      this.Series.push({ valueField : "present", name : "حاضرین" });
      this.Series.push({ valueField : "absent", name :  "غایبین" });
    },
    error =>{
      this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
    });
  }
}
