import { Component, OnInit } from '@angular/core';
import { NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../../common-service/service/base-crud.service';
import { FormServerErrorMessageService } from '../../../common-service/validator-service/form-server-error-message.service';
import { UserRoleDto } from 'app/common-service/models/web-site/user-role.dto';
import { AccessItemDto } from 'app/common-service/models/access-item.dto';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'app/core/auth/auth.service';
import Globals from 'app/common-service/globals';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-url-redirect',
  templateUrl: './url-redirect.component.html',
})
export class UrlRedirectComponent implements OnInit {

  datasource : UserRoleDto[]=[];
  private baseUrlApi : string = "";
  accessItem :AccessItemDto;
    constructor(
        public translate: TranslateService,
    private crudService: BaseCrudService, 
    private modalService: MatDialog, 
    private toastMessageService: ToastMessageService,
    private activateRoute:ActivatedRoute,
    private router:Router,
    private accessKeywordService:AccessKeywordService,
    private serverError: FormServerErrorMessageService ) {
      this.baseUrlApi = Globals.UrlUserRole ;       
   }

  ngOnInit() {

    let id = this.activateRoute.snapshot.params['id'];
    if (id !== undefined && id > 0) {
      if(id==1){
        window.open("http://Reports.fintraca.gov.af","_blank");
        this.router.navigateByUrl('index-info')
      }else if(id==2){
        window.open("http://sanctionscreening.dab.gov.af:5050","_blank");
        this.router.navigateByUrl('index-info')
      }else if(id==3){
        window.open("https://sarafi.af/fa/exchange-rates","_blank");
        this.router.navigateByUrl('index-info')
      }
    }
  }

}
