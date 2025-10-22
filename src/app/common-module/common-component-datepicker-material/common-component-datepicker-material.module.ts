import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { DatePersianPickerComponent } from './date-persian-picker/date-persian-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from '../commom-helper/date-adapter/persian-date-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonDirectiveModule } from '../common-directive/common-directive.module';
const MODULES = [
];

@NgModule({
  imports: [
    MatFormFieldModule,
        
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    //MatProgressBarModule,
    //MatSelectModule,
    //MatSidenavModule,
    //MatSlideToggleModule,
    //MatTooltipModule,
    //FuseFindByKeyPipeModule,
    //SharedModule,
    //MatTabsModule,
    //MatTableModule,
    //MatPaginatorModule,
    //MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    //MatSortModule,
    //MatProgressSpinnerModule,
    //MatTreeModule,
    //MatDialogModule,
    //MatButtonToggleModule,
    //MatCheckboxModule,
    //NgxMatSelectSearchModule,    

    ReactiveFormsModule,
    CommonDirectiveModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    //...MODULES,   
    
    
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    TimePickerComponent,
    DatePersianPickerComponent,
  ],
  exports: [
    TimePickerComponent,
    DatePersianPickerComponent,
  ],
  entryComponents: [

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS },
  ],
})
export class CommonComponentDatePickerMaterialModule {
  static forRoot() {
    return {
      NgModule: CommonComponentDatePickerMaterialModule,
    }
  }
}
