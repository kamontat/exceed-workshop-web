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
  air: Status;
  temperature: Status;

  opened: boolean;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getMode().then(mode => this.mode = mode);
    this.appService.getLight().then(light => this.light = light);
    this.appService.getAir().then(air => this.air = air);
    this.appService.getTemperature().then(temperature => this.temperature = temperature);
    this.appService.getPerson().then(person => this.person = person);
  };

  auto(): void {
    if (this.mode.value == "automatic")
      this.mode.value = "manual";
    else
      this.mode.value = "automatic";
    this.appService.update(this.mode).then(status => console.log(status));
  }

  setAir(): void {
    if (this.air.value == "off")
      this.air.value = "on";
    else
      this.air.value = "off";
    this.appService.update(this.air).then(status => console.log(status));
  }

  setLight(): void {
    if (this.light.value == "off")
      this.light.value = "on";
    else
      this.light.value = "off";
    this.appService.update(this.light).then(status => console.log(status));
  }

  opendoor(): void {
    // TODO: open door
  }

  isAuto(): boolean {
    return this.mode.value === "automatic";
  }

  open(): void {
    this.opened = true
  }
}
