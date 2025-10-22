import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-page-header',
    templateUrl: './app-page-header.component.html',
})
export class PageHeaderComponent {

    @Input()
    title: string =this.translate.instant('page-title');
    @Input()
    subTitle: string =this.translate.instant('the-information-is-displayed-as-a-list-in-the-lower-section');
    @Input()
    isAddButton: boolean = false;
    @Input()
    isCloseButton: boolean = false;
    @Input()
    isSearchBox: boolean = false;
    @Input()
    isSaveButton: boolean = false;
    @Input()
    isSaveButtonDisabled: boolean = false;
    @Input()
    isSaveButton2: boolean = false;
    @Input()
    isSaveButtonAccess: boolean = false;
    @Input()
    isRemoveAction: boolean = false;
    @Input()
    returnUrl: string = "";
    @Input()
    returnGoto: string = "";
    @Input()
    returnGotoTitle: string = "";

    @Input()
    txtCustomButton: string = "";
    @Input()
    txtCustomButton2: string = "";

    @Output() OnAddItem: EventEmitter<any> = new EventEmitter();
    @Output() OnSaveItem: EventEmitter<any> = new EventEmitter();
    @Output() OnSaveCustom: EventEmitter<any> = new EventEmitter();
    @Output() OnSaveCustom2: EventEmitter<any> = new EventEmitter();
    @Output() OnClose: EventEmitter<any> = new EventEmitter();
    @Output() OnTextFilter: EventEmitter<any> = new EventEmitter();
    @Output() OnSaveAccess: EventEmitter<any> = new EventEmitter();
    @Output() OnRemoveAction: EventEmitter<any> = new EventEmitter();



    isLoading: boolean = false;
    constructor(public translate: TranslateService, private router: Router) {         //, public dialogRef: MatDialogRef<any>
    }

    OnAdd() {
        this.OnAddItem.next();
    }

    OnSave() {
        this.OnSaveItem.next();
    }

    onSaveAccess() {
        this.OnSaveAccess.next();
    }

    OnCustomSave() {
        this.OnSaveCustom.next();
    }

    OnCustomSave2() {
        this.OnSaveCustom2.next();
    }

    goto() {
        this.router.navigateByUrl(this.returnGoto);
    }

    gotoUrl() {
        this.router.navigateByUrl(this.returnUrl);
    }

    onRemoveAction() {
        this.OnRemoveAction.next()
    }

    closeModal() {
        this.OnClose.next();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.OnTextFilter.emit(filterValue);
    }

}

