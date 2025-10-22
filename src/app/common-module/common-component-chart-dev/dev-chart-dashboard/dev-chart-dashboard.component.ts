import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
    selector: 'app-chart-dashboard',
    templateUrl: './dev-chart-dashboard.component.html',
    styleUrls:[ './dev-chart-dashboard.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DevChartDashboardComponent implements OnInit {
   
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

    constructor() {        
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

