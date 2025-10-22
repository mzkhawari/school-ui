import { Injectable } from '@angular/core';
import { LoadingComponent } from 'app/common-module/loading-component/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private instances: {[key: string]: LoadingComponent} = {};

  public registerInstance(name: string, instance: LoadingComponent) {  
    this.instances[name] = instance;
  }

  public removeInstance(name: string, instance: LoadingComponent) {
    if (this.instances[name] === instance) {
      delete this.instances[name];
    }
  }

  public hide(name: string) {
  }

  public show(name: string) {
  }
}
