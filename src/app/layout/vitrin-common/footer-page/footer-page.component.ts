import { Component, OnInit } from '@angular/core';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { LanguageService } from 'app/common-service/service/language.service';

@Component({
  selector: 'app-footer-page',
  templateUrl: './footer-page.component.html',
  styleUrls: ['./footer-page.component.css'],
})
export class FooterPageComponent implements OnInit {


  constructor( private crudService:BaseCrudService, private languageService: LanguageService){

  }

  footerAddress:any;
  footerLastNews:any[]=[];
  ngOnInit(): void {

    let lang = this.languageService.getActiveLang();
    this.crudService.getDataUrl(Globals.UrlVitrin, `footerInfo/${lang}`).subscribe( res =>{
      this.footerAddress = res.address
      this.footerLastNews = res.lastNews
    });
  }
}
