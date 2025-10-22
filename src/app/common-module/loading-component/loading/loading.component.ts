import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LoadingService } from 'app/common-service/loading-service/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {
  
  @Input() name: string="";
  @Input() value: number =0;
  @Input() countRecord: number =1;
  
  isVisible = true;

  constructor(private service: LoadingService) {}

  ngOnInit() {
    if (this.name) {
      this.service.registerInstance(this.name, this);
    }    
  }

  ngOnDestroy() {
    if (this.name) {
      this.service.removeInstance(this.name, this);
    }
  }

  public hide(){
     
    setTimeout(() => {
      this.isVisible = false;      
    }, 1000);
  }

  public show(){
    let that = this;
    setInterval(()=>{
      that.isVisible = true;    
    },1000);    
  }
  /* ... code to show/hide this component */
}
