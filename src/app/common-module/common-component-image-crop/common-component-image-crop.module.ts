import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { ImageCropperModule } from 'ngx-image-cropper';
const MODULES = [
];

@NgModule({
  imports: [
    MatFormFieldModule,
    
    ReactiveFormsModule,
    MatIconModule,
    ImageCropperModule,

    CommonModule,
    FormsModule,
    TranslateModule,
    //...MODULES,   
    
    
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ImageCropComponent,
  ],
  exports: [
    ImageCropComponent,
  ],
  entryComponents: [

  ],
  providers: [
  ],
})
export class CommonComponentImageCropModule {
  static forRoot() {
    return {
      NgModule: CommonComponentImageCropModule,
    }
  }
}
