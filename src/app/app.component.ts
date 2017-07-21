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

  mode: Status = new Status(0, "");
  light: Status = new Status(1, "");
  person: Status = new Status(3, "");
  air: Status = new Status(2, "");
  temperature: Status = new Status(4, "");

  opened: boolean;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    console.log("initial");
    this.appService.getMode().subscribe(mode => {
      console.log("mode: " + mode);
      this.mode = new Status(0, mode);
    });
    this.appService.getLight().subscribe(light => this.light = new Status(1, light));
    this.appService.getAir().subscribe(air => this.air = new Status(2, air));
    this.appService.getTemperature().subscribe(temperature => this.temperature = new Status(4, temperature));
    this.appService.getPerson().subscribe(person => this.person = new Status(3, person));
  };

  auto(): void {
    if (this.mode.value == "automatic")
      this.mode.value = "manual";
    else
      this.mode.value = "automatic";
    this.appService.update(this.mode).subscribe(status => console.log(status));
  }

  setAir(): void {
    if (this.air.value == "off")
      this.air.value = "on";
    else
      this.air.value = "off";
    this.appService.update(this.air).subscribe(status => console.log(status));
  }

  setLight(): void {
    if (this.light.value == "off")
      this.light.value = "on";
    else
      this.light.value = "off";
    this.appService.update(this.light).subscribe(status => console.log(status));
  }

  openDoor(): void {
    this.appService.openDoor().subscribe(status => console.log("open door"));
  }

  isAuto(): boolean {
    return this.mode.value === "automatic";
  }

  open(): void {
    this.opened = true
  }
}
