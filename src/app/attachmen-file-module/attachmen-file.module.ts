import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AttachmentFileComponent } from './attachment-file/attachment-file.component';
import { CommonComponentGridMaterialModule as CommonComponentGridMaterialModule } from 'app/common-module/common-component-grid-material/common-component-grid-material.module';

@NgModule({
    declarations: [        
        AttachmentFileComponent,        
    ],
    imports: [
        //CommonModule,
        //FormsModule,
        //ReactiveFormsModule,
        //CommonComponentDevexpressModule,
        CommonComponentGridMaterialModule,
        SharedModule,
    ],
    exports:[ 
        AttachmentFileComponent
    ]
    
})
export class AttachmentFileModule {
}
