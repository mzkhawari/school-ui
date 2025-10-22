import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  public modelTitle: string ="";

  public Mssages: string ="We got it"; 
  public MsgDeleteConfirm: string = "Are You Sure?";
  public MssageError: string ="Error";

  
  public MsgAddSuccess: string =`The ${this.modelTitle} saved successfully.`;

  public MsgDeleteSuccess: string = `The ${this.modelTitle} Deleted successfully.`;
  
  public MsgEditSuccess: string =`The ${this.modelTitle} Edited successfully.`;

  public MsgEditFail : string =`The ${this.modelTitle} Edited Fail.`;
  
  public MsgDeleteFail: string = `The ${this.modelTitle} Deleted Fail.`;

  
  //public MsgServerError: string = "Server Error";
  
  
  public FormComplete : string ="Please Complete Form Value!";
  public MsgCheckCoopSuccess: string = "CoOperation is Correct!";
  public MsgCheckCoopFail: string = "Operation is not Correct!";
  //public UserListTitle: string ="List Users";
  //public UserAddTitle: string ="Add User";
  public MsgForgetPassSendEmail: string ="Please Check Your Email!";

  public Mssage401: string ="Please Login Again!";
  

  constructor() { 
  }
}
