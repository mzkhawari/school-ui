import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { HeaderTopComponent } from './header-top/header-top.component';
import { SwiperModule } from 'swiper/angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FooterPageComponent } from './footer-page/footer-page.component';
import { LanguagesModule } from '../common/languages/languages.module';

@NgModule({
  imports: [
    MatSnackBarModule,
    SwiperModule,
    CommonModule,
    FormsModule,
    LanguagesModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],  
  declarations: [
    HeaderTopComponent,
    FooterPageComponent,
  ],  
  exports:[
    HeaderTopComponent,
    FooterPageComponent,
  ],
  entryComponents: [

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ]

})
export class VitrinLayoutComponentModule {
  static forRoot(){
    return{
      NgModule : VitrinLayoutComponentModule,
    }
  }
 }
