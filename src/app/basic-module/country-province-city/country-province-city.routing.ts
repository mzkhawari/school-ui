import { Route } from '@angular/router';
import { CountryProvinceCityComponent } from './country-province-city.component';

export const countryProvinceCityRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',        
        component: CountryProvinceCityComponent,
        // resolve  : {
        //     countries : CountryResolver,
        //     provinces : ProvinceResolver,
        //     cities : CityResolver,
        // },                    
    },
    // {
    //     path     : 'CountryProvinceCity',
    //     pathMatch: 'full',
    //     component: CountryProvinceCityComponent,
    //     resolve  : {
    //         countries : CountryResolver,
    //         provinces : ProvinceResolver,
    //         cities : CityResolver,
    //     },                    
    // }
];
