import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html'
})
export class HeaderTopComponent implements OnInit {

  
  constructor(private crudService:BaseCrudService, private _translocoService: TranslocoService){
    
  }

  newsCategory:any[]=[];
  webpageInfos:any[]=[];
  
  ngOnInit(): void {
    
       
      
      // this.crudService.getDataUrl(Globals.UrlVitrin,`webpageinfo/${lang}`).subscribe(res=>{
      //   this.webpageInfos = res;
      // });
    }  
  }
