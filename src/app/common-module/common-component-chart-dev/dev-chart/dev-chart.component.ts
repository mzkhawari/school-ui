import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-devchart',
    templateUrl: './dev-chart.component.html',
    styleUrls:[ './dev-chart.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DevChartComponent implements OnInit {
   
    model : any;
  
    @Input() title: string="";
    @Input() chartId: string="chartId";
    @Input() chartType: string="bar";
    @Input() useBackground:boolean =false;    
    
    @Input() dataChart : any;
    @Input() argumentFiled : string ="";
    @Input() series : any=[];
    @Input() averageSend:number = 0;
    @Input() averageRun:number = 0;

    constructor(
        public translate: TranslateService
    ) {        
        //window.console.log(this.dataChart)      
        this.dataChart=[];
        this.series =[];
        this.averageSend = 0;
        this.averageRun = 0;
    }

    ngOnInit(){
    }    
   
    OnContentReady(e:any) {  
    
    }

      

}

