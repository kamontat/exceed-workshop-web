import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';

import { Status } from './status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'custom app';

  mode: Status;
  light: Status;
  person: Status;
  temp: Status;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getMode();
  };

  getMode(): void {
    this.appService.getMode().then(mode => this.mode = mode);
  }

  auto(): void {
    if (this.mode.value == "automatic") {
      this.mode.value = "manual";
      this.appService.update(this.mode);
    } else {
      this.mode.value = "automatic";
      this.appService.update(this.mode);
    }

    console.log(this.mode.value);
  }

  isAuto(): boolean {
    return this.mode.value === "automatic";
  }
}
