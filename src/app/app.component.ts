import { Component } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'custom app';

  constructor(private appService: AppService) { }

  getMode(): void {
    this.appService.getMode();
  }
}
