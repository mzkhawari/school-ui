import { Component, Input, OnInit } from '@angular/core';
import { AccessItemDto } from 'app/common-service/models/access-item.dto';
import Globals from 'app/common-service/globals';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { NbToastStatus, ToastMessageService } from 'app/common-service/service/toast-message.service';
import { MatDialogRef } from '@angular/material/dialog';
import OrgChart from "@balkangraph/orgchart.js";
import { ChartOrganDto } from 'app/branch-module/models/chart-organ.dto';


@Component({
  selector: 'app-chart-organ-diagram-view',
  templateUrl: './chart-organ-diagram-view.component.html',
})
export class ChartOrganDiagramViewComponent implements OnInit {


  @Input()
  dataSource : ChartOrganDto[]=[];  
  accessItem :AccessItemDto;
  private baseUrlApi : string = "";
    constructor(
        public tranlate: TranslateService,
    private crudService: BaseCrudService,    
    private accessKeywordService:AccessKeywordService,
    public dialogRef: MatDialogRef<ChartOrganDiagramViewComponent>,
    public splashScreenService: LoadingSplashScreenService,
    private translate: TranslateService,
    private toastMessageService: ToastMessageService ) {
      this.baseUrlApi = Globals.UrlChartOrgan;      
   }



  listTitle:string='';
  btnTitle: string ="";
  returnUrlAddress:string ='';
  idParentCategory:number =0;
  ngOnInit() {
    this.listTitle =this.translate.instant('display-organizational-chart');
    //this.get(0);

     
    let treeData:any[]=[];
    for(let i=0; this.dataSource.length > i; i++){
        treeData.push({
          id: this.dataSource[i].id, 
          name: this.dataSource[i].fullName, 
          title: this.dataSource[i].postTitle, 
          img : this.dataSource[i].picUrlAvatar, 
          pid : this.dataSource[i].parentId
        }) 
    } 
    

    const tree = document.getElementById('tree');
    if (tree) {
        var chart = new OrgChart(tree, {
            nodeBinding: {
            field_0: "name",
            img_0: "img"
            },
        });

        chart.load(treeData);

        //  chart.load([
        //     { id: 1, name: "Denny Curtis", title: "CEO", img: "https://cdn.balkan.app/shared/2.jpg" },
        //     { id: 2, pid: 1, name: "Ashley Barnett", title: "Sales Manager", img: "https://cdn.balkan.app/shared/3.jpg" },
        //     { id: 3, pid: 1, name: "Caden Ellison", title: "Dev Manager", img: "https://cdn.balkan.app/shared/4.jpg" },
        //     { id: 4, pid: 2, name: "Elliot Patel", title: "Sales", img: "https://cdn.balkan.app/shared/5.jpg" },
        //     { id: 5, pid: 2, name: "Lynn Hussain", title: "Sales", img: "https://cdn.balkan.app/shared/6.jpg" },
        //     { id: 6, pid: 3, name: "Tanner May", title: "Developer", img: "https://cdn.balkan.app/shared/7.jpg" },
        //     { id: 7, pid: 3, name: "Fran Parsons", title: "Developer", img: "https://cdn.balkan.app/shared/8.jpg" }
        // ]);
    }

  }


  get(id:number){
    // if(!this.accessKeywordService.checkAccessShow(AccessKeyword.ACCKEY_Currency) ){
    //   return ;
    // }
    this.splashScreenService.show();
    this.crudService.getDataUrl(this.baseUrlApi, `GetInclude/${id}`).subscribe(res=>{
      this.splashScreenService.hide();
    },
    error =>{
      this.splashScreenService.hide();
      this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('error'), error.Message);
    });
  }

}
