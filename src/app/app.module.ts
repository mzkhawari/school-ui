import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule, LOCATION_INITIALIZED } from '@angular/common';
import { NgxCurrencyModule } from "ngx-currency";
import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from './shared/shared.module';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { mockApiServices } from './mock-api';
import { CommonComponentExchangeModule } from './basic-module/common-component-exchange/common-component-exchange.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { VitrinLayoutModule } from './layout/layouts/vitrin/vitrin-layout.module';
import { SwiperModule } from 'swiper/angular';
import { LoadingComponentModule } from './common-module/loading-component/loading-component.module';
import { CommonComponentGridMaterialModule } from './common-module/common-component-grid-material/common-component-grid-material.module';


const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
  useHash: true,
  enableTracing: false,
};

const config: ExtraOptions = {
  useHash: true,
  enableTracing: false,
};

export const customCurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  allowZero: true,
  decimal: ".",
  precision: 0,
  prefix: "",
  suffix: "",
  thousands: ",",
  nullable: true
};



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    CurrencyMaskModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, routerConfig),
    AngularEditorModule,

    // Fuse, FuseConfig & FuseMockAPI
    FuseModule,
    FuseConfigModule.forRoot(appConfig),
    FuseMockApiModule.forRoot(mockApiServices),
    // Core module of your application
    CoreModule,

    // Layout module of your application
    LayoutModule,
    VitrinLayoutModule,

    // 3rd party modules that require global configuration via forRoot
    MarkdownModule.forRoot({}),    
    LoadingComponentModule,
    CommonComponentExchangeModule,
    SharedModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fa',
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
    }),
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill'
      }
    },
    { provide: CURRENCY_MASK_CONFIG, useValue: customCurrencyMaskConfig },
    // ... other providers like services
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
