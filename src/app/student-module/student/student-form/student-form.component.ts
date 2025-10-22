import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastMessageService, NbToastStatus, MyErrorStateMatcher } from 'app/common-service/service/toast-message.service';
import { TranslateService } from '@ngx-translate/core';
import { StudentDto } from 'app/class-module/models/student.dto';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';

@Component({
  selector: 'student-form',
  templateUrl: './student-form.component.html',
})
export class StudentFormComponent implements OnInit {
  @Input() model: StudentDto = new StudentDto();
  
  addstring = '';
  editstring = '';
  isViewForm = false;
  isSaveButton = true;
  ishomepage = false;
  returnUrlAddress = '';

  imageURL: string = "../../../../assets/images/Akramzada/avatar-pic.png";
  selectedFileAvatar?: File;

  constructor(
    public dialogRef: MatDialogRef<StudentFormComponent>,
    private crudService: BaseCrudService,
    private toastService: ToastMessageService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.addstring = this.translate.instant('add-student');
    this.editstring = this.translate.instant('edit-student');

    if (!this.model) this.model = new StudentDto();
    if (!this.model.id) this.model.id = 0;
  }

  // Image upload
    setImage(event: any) {
    const file = event.target.files[0];
    this.selectedFileAvatar = file;
    const reader = new FileReader();
    reader.onload = () => this.imageURL = reader.result as string;
    reader.readAsDataURL(file);
  }

  matcher = new MyErrorStateMatcher();

  applicantCodeCtrl = new FormControl('', Validators.required);
  firstNameCtrl = new FormControl('', Validators.required);
  lastNameCtrl = new FormControl('', Validators.required);
  fatherNameCtrl = new FormControl('', Validators.required);
  fullNameCtrl = new FormControl('', Validators.required);
  cellPhoneCtrl = new FormControl('', Validators.required);
  cellPhoneEitaaCtrl = new FormControl('', Validators.required);
  birthDateCtrl = new FormControl('', Validators.required);
  nationalityCtrl = new FormControl('', Validators.required);
  nationalCodeCtrl = new FormControl('', Validators.required);
  addressCtrl = new FormControl('', Validators.required);

  OnSubmit(form: NgForm) {
    if (form.valid) {
      this.OnSave(this.model);
    } else {
      this.toastService.showToast(
        NbToastStatus.WARNING,
        this.translate.instant('warning'),
        this.translate.instant('please-fill-in-the-form-values-​​correctly')
      );
    }
  }

    OnSave(model: StudentDto) {
  
      var id = model.id;
      if (id == 0 || id == undefined) {
        model.id = 0;
      }

      model.userId =0;
      const formData: FormData = new FormData();
      let modelData: any = model;
      for (const key in modelData) {
        if (modelData.hasOwnProperty(key)) {
          formData.append(key, modelData[key]);
        }
      }
      if (this.selectedFileAvatar) {
        let name = this.selectedFileAvatar.name;
        //let ext = name !== '' ? name.split('.')[1] : '';
        formData.append('file', this.selectedFileAvatar, `avatar-${name}`);
      }
  
  
      
      this.crudService.postFormData(`${Globals.UrlStudent}postStudentAvatar`, formData).subscribe(res => {
        if (res) {
          this.toastService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'),this.translate.instant('added-successfully'))
          this.dialogRef.close();
        } else {
          this.toastService.showToast(NbToastStatus.DANGER,this.translate.instant('error-message'),this.translate.instant('unknown-error'))
        }
      }, error => {
        this.toastService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
      },
        () => {
          this.model = new StudentDto();
          this.dialogRef.close();
        })
    }
}
