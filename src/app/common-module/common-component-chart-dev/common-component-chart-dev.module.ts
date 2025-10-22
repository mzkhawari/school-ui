import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxChartModule,
  DxPieChartModule,
} from 'devextreme-angular';
import { DevChartComponent } from './dev-chart/dev-chart.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonDirectiveModule } from '../common-directive/common-directive.module';
import { CommonPipeModule } from '../common-pipe/common-pipe.module';
import { DevChartDashboardComponent } from './dev-chart-dashboard/dev-chart-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DxChartModule,
    DxPieChartModule,

    TranslateModule,
    CommonDirectiveModule,
    CommonPipeModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],  
  declarations: [
    DevChartComponent,
    DevChartDashboardComponent
  ],  
  exports:[
    DevChartComponent,
    DevChartDashboardComponent  
  ],
  entryComponents: [

  ]
})
export class CommonComponentChartDevexpressModule {
  static forRoot(){
    return{
      NgModule : CommonComponentChartDevexpressModule,
    }
  }
 }
