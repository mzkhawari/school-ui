import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Globals from '../globals';
import { AccessItemDto } from '../models/access-item.dto';
import { UserDto } from '../models/web-site/user.dto';
import { NbToastStatus, ToastMessageService } from '../service/toast-message.service';

@Injectable({
  providedIn: 'root'
})
export class AccessKeywordService {


  private findAccessByKey(key: string): AccessItemDto {

    let data = localStorage.getItem('currentUser');
    if (data !== undefined && data !== "") {
      let currentUserSubject = new BehaviorSubject<UserDto>(JSON.parse(data));
      let custInfo = currentUserSubject.value.accessKey;
      return custInfo.find(f => f.key == key);
    }
    return null;
  }

  accessItem: AccessItemDto;
  constructor(private toastMessageService: ToastMessageService,
    private router: Router) {
  }

  public checkAccessShow(key: string): boolean {
     
    this.accessItem = this.findAccessByKey(key);
    if (this.accessItem == undefined || (!this.accessItem.isAdd && !this.accessItem.isShow)) {
      this.toastMessageService.showToast(NbToastStatus.WARNING, "هشدار-دسترسی", "شما اجازه مشاهده لیست را ندارید")
      this.router.navigateByUrl('/index-info');
      return false;
    }
    return true;
  }

  public checkAccessAdd(key: string, isShowMessage?: boolean): boolean {
    this.accessItem = this.findAccessByKey(key);
    if (this.accessItem == undefined || !this.accessItem.isAdd) {
      if (isShowMessage == undefined || isShowMessage == true) {
        this.toastMessageService.showToast(NbToastStatus.WARNING, "هشدار-دسترسی", "شما اجازه افزودن جدید را ندارید")
      }
      return false;
    }
    return true;
  }

  public checkAccessEdit(key: string): boolean {
    this.accessItem = this.findAccessByKey(key);
    if (this.accessItem == undefined || !this.accessItem.isEdit) {
      this.toastMessageService.showToast(NbToastStatus.WARNING, "هشدار-دسترسی", "شما اجازه ویرایش را ندارید")
      return false;
    }
    return true;
  }


  public checkAccessDelete(key: string): boolean {
    this.accessItem = this.findAccessByKey(key);
    if (!this.accessItem.isDelete) {
      this.toastMessageService.showToast(NbToastStatus.WARNING, "هشدار-دسترسی", "شما اجازه حذف ندارید")
      return false;
    }
    return true;
  }

  public checkAccessOther(key: string, title: string): boolean {
    this.accessItem = this.findAccessByKey(key);
    if (this.accessItem == undefined || !this.accessItem.isAdd) {
      this.toastMessageService.showToast(NbToastStatus.WARNING, "هشدار-دسترسی", `شما اجازه${title} ندارید`)
      return false;
    }
    return true;
  }
}
