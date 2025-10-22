import { Component, OnInit } from '@angular/core';
import { BaseCrudService } from '../../../common-service/service/base-crud.service';
import Globals from '../../../common-service/globals';
import { Subject } from 'rxjs';
import { NbToastStatus, ToastMessageService } from 'app/common-service/service/toast-message.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-student-statistic',
    templateUrl: './student-statistic.component.html',
})

export class StudentStatisticComponent implements OnInit {


    private _unsubscribeAll: Subject<any> = new Subject<any>();
    model: any = {};
    constructor(
        public translate: TranslateService,
        private toastMessageService: ToastMessageService,
        private crudService: BaseCrudService) {
    }

    ngOnInit() {
        this.get();
    }


    allStudent: number = 0;
    presentStudent: number = 0;
    absentStudent: number = 0;
    accountTotal: number = 0;
    absentAllowStudent: number = 0;
    private get() {

        this.crudService.getDataUrl(Globals.UrlApplicantPersentReport, "studentCount").subscribe(res => {
             
            const data = res as any;
            this.allStudent = data.studentCount;
            this.presentStudent = data.studnetPresentCount;
            this.absentStudent = data.studnetAbsentCount;
            this.absentAllowStudent = data.studnetAbsentAllowCount;
            console.log(data);
        },
            error => {
                this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
            });
    }
}
