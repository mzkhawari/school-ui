import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IndexInfoComponent } from './index-info/index-info.component';
import { ShortcutkeyMenuComponent } from './shortcutkey-menu/shortcutkey-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExchangeRateBranchComponent } from './exchange-rate-branch/exchange-rate-branch.component';
import { ExchangeRateInfoComponent } from './exchange-rate-info/exchange-rate-info.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { TreasuryInfoComponent } from './treasury-info/treasury-info.component';
import { FinanceAmountInfoComponent } from './treasury-amount-info/treasury-amount-info.component';
import { MatSelectModule } from '@angular/material/select';
import { ChartOrganComponent } from 'app/branch-module/chart-organ/chart-organ.component';
import { ProfitIncomeDiagramComponent } from './profit-income-diagram/profit-income-diagram.component';
import { CommonComponentGridMaterialModule } from 'app/common-module/common-component-grid-material/common-component-grid-material.module';
import { CommonComponentChartDevexpressModule } from 'app/common-module/common-component-chart-dev/common-component-chart-dev.module';
import { StudentStatisticComponent } from './student-statistic/student-statistic.component';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,  
    TranslateModule,  
    CommonComponentChartDevexpressModule,
    CommonComponentGridMaterialModule,
    //CommonComponentDevexpressModule,
    //CommonComponentSelectMaterialModule,
    //CommonComponentDatePickerMaterialModule,
    //CommonComponentPageHeaderMaterialGridModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],  
  declarations: [
    IndexInfoComponent,
    ShortcutkeyMenuComponent,
    StudentStatisticComponent,
    ExchangeRateBranchComponent,
    ExchangeRateInfoComponent,
    TreasuryInfoComponent,
    FinanceAmountInfoComponent,
    ChartOrganComponent,
    ProfitIncomeDiagramComponent,
    
  ],  
  exports:[
    IndexInfoComponent,
    ShortcutkeyMenuComponent,
    StudentStatisticComponent,
    ExchangeRateBranchComponent,
    ExchangeRateInfoComponent,
    TreasuryInfoComponent,
    TranslateModule,  
    FinanceAmountInfoComponent,
    ChartOrganComponent,
    ProfitIncomeDiagramComponent
  ],
  entryComponents: [
  ],
})
export class CommonComponentExchangeModule {
  static forRoot(){
    return{
      NgModule : CommonComponentExchangeModule,
    }
  }
 }
