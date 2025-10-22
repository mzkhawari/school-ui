import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector       : 'CountryProvinceCity',
    templateUrl    : './country-province-city.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryProvinceCityComponent
{
    /**
     * Constructor
     */
    constructor(public translate: TranslateService)
    {
    }
}
