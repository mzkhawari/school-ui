import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Input, OnDestroy, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoadingService } from 'app/common-service/loading-service/loading.service';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'splash-loading',
  templateUrl: './loading-splash.component.html',
  styleUrls: ['./loading-splash.component.css']
})
export class LoadingSplashComponent {

  constructor(
    @Inject(DOCUMENT) private _document: any) {
    // Hide it on the first NavigationEnd event
  }
}
