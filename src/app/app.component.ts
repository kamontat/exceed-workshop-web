import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';

import { Status } from './status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  DEFAULT_SENSOR_IN: number = 22;
  DEFAULT_SENSOR_OUT: number = 22;
  DEFAULT_SENSOR_DIFF: number = 8;

  CONS_CLOSE: number = 1;
  CONS_OUT_EXIST: number = 1;
  CONS_IN_EXIST: number = 2;
  CONS_OPEN: number = 3;

  title = 'custom app';

  mode: Status = new Status(0, "automatic");
  light: Status = new Status(1, "off");
  air: Status = new Status(2, "off");
  person: Status = new Status(3, "0");
  temperature: Status = new Status(4, "0");

  state: number = this.CONS_CLOSE;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    console.log("start initial");
    setInterval(() => {
      this.calculation();
    }, 1000 * 2);
  };

  calculation(): void {
    this.appService.getMode().subscribe(mode => {
      console.log("mode: " + mode);
      this.mode = new Status(0, mode);
    });
    this.appService.getLight().subscribe(light => {
      console.log("light: " + light);
      this.light = new Status(1, light);
    });
    this.appService.getAir().subscribe(air => {
      console.log("air: " + air);
      this.air = new Status(2, air);
    });
    this.appService.getTemperature().subscribe(temperature => {
      this.temperature = new Status(4, temperature);
      if (this.mode.value === "automatic") {
        var status = "";
        if (Number.parseInt(temperature) > 27) {
          status = "on";
        } else {
          status = "off";
        }
        console.log("turn air " + status + " (auto)");
        this.air.value = status;
        this.appService.update(new Status(2, status));
      } else
        console.log("air - manual");
    });
    this.appService.getPerson().subscribe(person => {
      console.log("person: " + person);
      this.person = new Status(3, person);
    });

    this.appService.getLightSensor().subscribe(value => {
      if (this.mode.value === "automatic") {
        var status = ""
        if (Number.parseInt(value) < 550)
          status = "on"
        else
          status = "off"
        console.log("turn light " + status + " (auto)");
        this.light.value = status
        this.appService.update(new Status(1, status))
      } else
        console.log("light - manual")
    });

    this.appService.getSonic().subscribe(value => {
      var arr = value.split(",");
      if (arr.length != 2) {
        console.error("something went error");
      } else {
        var outS: number = Number.parseInt(arr[0]);
        var inS: number = Number.parseInt(arr[1]);

        // detected
        if (this.state == this.CONS_CLOSE) {
          if (this.isOut(outS)) {
            this.openDoor();
            this.state = this.CONS_OUT_EXIST;
          } else if (this.isIn(inS)) {
            this.openDoor();
            this.state = this.CONS_IN_EXIST;
          }
        } else if (this.state == this.CONS_IN_EXIST) {
          if (this.isOut(outS)) {
            this.removePerson();
            this.closeDoor();
            this.state = this.CONS_CLOSE;
          }
        } else if (this.state == this.CONS_OUT_EXIST) {
          if (this.isIn(inS)) {
            this.addPerson();
            this.closeDoor();
            this.state = this.CONS_CLOSE;
          }
        }
      }
    });
  }

  addPerson() {
    this.person.value = (Number.parseInt(this.person.value) + 1).toString()
  }

  removePerson() {
    this.person.value = (Number.parseInt(this.person.value) - 1).toString()
  }

  isIn(value: number): boolean {
    return this.DEFAULT_SENSOR_IN - value > this.DEFAULT_SENSOR_DIFF
  }

  isOut(value: number): boolean {
    return this.DEFAULT_SENSOR_OUT - value > this.DEFAULT_SENSOR_DIFF
  }

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

  closeDoor(): void {
    this.appService.closeDoor().subscribe(status => console.log("close door"));
  }

  isAuto(): boolean {
    return this.mode.value === "automatic";
  }
}
