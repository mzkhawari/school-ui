import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevDropDownGridComponent } from './dev-dropdown-grid/dev-dropdown-grid.component';
import {
  DxDropDownBoxModule,
  DxTreeViewModule,
} from 'devextreme-angular';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { DevTreeViewComponent } from './dev-tree-view/dev-tree-view.component';
import { CommonDirectiveModule } from '../common-directive/common-directive.module';
import { CommonPipeModule } from '../common-pipe/common-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    DxDropDownBoxModule,  
    DxTreeViewModule,

    TranslateModule,
    CommonDirectiveModule,
    CommonPipeModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],  
  declarations: [
    DevDropDownGridComponent,
    DevTreeViewComponent,
  ],  
  exports:[
    DevDropDownGridComponent,
    DevTreeViewComponent,
  ],
  entryComponents: [

  ]
})
export class CommonComponentDevexpressModule {
  static forRoot(){
    return{
      NgModule : CommonComponentDevexpressModule,
    }
  }
 }
