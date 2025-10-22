import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { CountryProvinceCityComponent } from './country-province-city.component';
import { CountryComponent } from './country/country.component';
import { ProvinceComponent } from './province/province.component';
import { CityComponent } from './city/city.component';
import { countryProvinceCityRoutes } from './country-province-city.routing';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { ProvinceFormComponent } from './province/province-form/province-form.component';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CountryFormComponent } from './country/country-form/country-form.component';
import { CityFormComponent } from './city/city-form/city-form.component';
import { CommonComponentDevexpressModule } from 'app/common-module/common-component-dev/common-component-dev.module';
import { CommonComponentGridMaterialModule } from 'app/common-module/common-component-grid-material/common-component-grid-material.module';
import { CommonComponentSelectMaterialModule } from 'app/common-module/common-component-select-material/common-component-select-material.module';
import { CommonComponentDatePickerMaterialModule } from 'app/common-module/common-component-datepicker-material/common-component-datepicker-material.module';
import { CommonComponentPageHeaderMaterialModule } from 'app/common-module/common-component-page-header-material/common-component-page-header-material.module';
import { ZoneComponent } from './zone/zone.component';
import { ZoneFormComponent } from './zone/zone-form/zone-form.component';

@NgModule({
    declarations: [
        CountryProvinceCityComponent,
        CountryComponent,
        CountryFormComponent,
        ProvinceComponent,
        ProvinceFormComponent,
        CityComponent,
        CityFormComponent,

        ZoneComponent,
        ZoneFormComponent,
    ],
    imports     : [
        CommonModule,
        RouterModule.forChild(countryProvinceCityRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,        
        FormsModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,      
        MatAutocompleteModule,  
        MatSlideToggleModule,
        MatTooltipModule,
        MatTabsModule,        
        SharedModule,
        //CommonComponentDevexpressModule,
        //CommonComponentSelectMaterialModule, 
        CommonComponentGridMaterialModule,
        CommonComponentPageHeaderMaterialModule, 
        //CommonComponentDatePickerMaterialModule,

    ],
    schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class CountryProvinceCityModule
{
}
