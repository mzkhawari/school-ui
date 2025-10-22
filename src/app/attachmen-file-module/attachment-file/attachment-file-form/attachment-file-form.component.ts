import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-attachment-file-form',
  templateUrl: './attachment-file-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AttachmentFileFormComponent),
      multi: true
    },
  ]
})
export class AttachmentFileFormComponent implements OnInit {


  @Input()
  model: string;

  constructor(
    public translate: TranslateService,
    public dialogRef: MatDialogRef<AttachmentFileFormComponent>) {
    this.model = "";
  }

  returnUrlAddress = '';
  ngOnInit() {
  }
}
