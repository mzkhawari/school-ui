import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { LoadingSplashComponent } from './loading-splash/loading-splash.component';
import { LoadingSplashScreenService } from './services/loading-splash-screen.service';

const MODULES = [
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //...MODULES,    
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    LoadingComponent,
    LoadingSplashComponent
  ],
  exports: [
    LoadingComponent,
    LoadingSplashComponent
  ],
  entryComponents: [

  ],
  providers: [
    LoadingSplashScreenService,

  ],

})
export class LoadingComponentModule {

  constructor(private _fuseSplashScreenService: LoadingSplashScreenService) {
  }

  static forRoot() {
    return {
      NgModule: LoadingComponentModule,
    }
  }
}
