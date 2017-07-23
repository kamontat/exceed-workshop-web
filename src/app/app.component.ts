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

  CONS_CLOSE: number = 0;
  CONS_OUT_EXIST: number = 1;
  CONS_IN_EXIST: number = 2;
  CONS_WAIT: number = 3;

  title = 'custom app';

  mode: Status = new Status(0, "automatic");
  light: Status = new Status(1, "off");
  air: Status = new Status(2, "off");
  person: Status = new Status(3, "0");
  temperature: Status = new Status(4, "0");
  door: Status = new Status(5, "off");

  state: number = this.CONS_CLOSE;

  opened: boolean = false;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    console.log("start initial");
    setInterval(() => {
      this.calculation();
    }, 1000 * 2);
  };

  calculation(): void {
    this.appService.getMode().subscribe(mode => {
      console.log("(mode): " + mode);
      this.mode = new Status(0, mode);
    });
    this.appService.getLight().subscribe(light => {
      console.log("(light): " + light);
      this.light = new Status(1, light);
    });
    this.appService.getAir().subscribe(air => {
      console.log("(air): " + air);
      this.air = new Status(2, air);
    });
    this.appService.getDoor().subscribe(door => {
      console.log("(door): " + door);
      this.door.value = door;
    });

    this.appService.getTemperature().subscribe(temperature => {
      console.log("(temperature): " + Number.parseInt(temperature));
      this.temperature.value = temperature;
      if (this.mode.value === "automatic") {
        var status = "";
        if (Number.parseInt(temperature) > 27) {
          status = "on";
        } else {
          status = "off";
        }
        console.log("(air) auto: " + status);
        this.air.value = status;
        this.appService.update(this.air).subscribe(status => console.log("(air) updated!"));
      } else
        console.log("(air) manual: " + this.air.value);
    });

    this.appService.getLightSensor().subscribe(value => {
      console.log("(light): " + Number.parseInt(value));
      if (this.mode.value === "automatic") {
        var status = ""
        if (Number.parseInt(value) < 550)
          status = "on"
        else
          status = "off"
        console.log("(light) auto: " + status);
        this.light.value = status
        this.appService.update(this.light).subscribe(status => console.log("(light) updated!"));
      } else
        console.log("(light) manual: " + this.light.value)
    });

    this.appService.getSonic().subscribe(value => {
      if (this.mode.value !== "automatic") return;
      var arr = value.split(",");
      if (arr.length != 2) {
        console.error("(door) something went error");
      } else {
        var outS: number = Number.parseInt(arr[0]);
        var inS: number = Number.parseInt(arr[1]);

	console.log("(door) sonic out: " + outS);
	console.log("(door) sonic in: " + inS);

        // detected
        if (this.state == this.CONS_CLOSE) {
          console.log("(door) state: CLOSE");
          if (this.isOut(outS)) {
            this.openDoor();
            this.state = this.CONS_OUT_EXIST;
          } else if (this.isIn(inS)) {
            this.openDoor();
            this.state = this.CONS_IN_EXIST;
          }
        } else if (this.state == this.CONS_IN_EXIST) {
          console.log("(door) state: IN EXIST");
          if (this.isOut(outS)) {
            this.removePerson();
            this.closeDoor();
            this.state = this.CONS_WAIT;
          }
        } else if (this.state == this.CONS_OUT_EXIST) {
          console.log("(door) state: OUT EXIST");
          if (this.isIn(inS)) {
            this.addPerson();
            this.closeDoor();
            this.state = this.CONS_WAIT;
          }
        } else if (this.state == this.CONS_WAIT) {
          console.log("(door) state: WAITING");
	  if (!this.isIn(inS) && !this.isOut(outS)) this.state = this.CONS_CLOSE;
	}
      }
    });
  }

  addPerson() {
    this.person.value = (Number.parseInt(this.person.value) + 1).toString()
    this.appService.update(this.person).subscribe(status => console.log("(person) get in"));
  }

  removePerson() {
    this.person.value = (Number.parseInt(this.person.value) - 1).toString()
    this.appService.update(this.person).subscribe(status => console.log("(person) get out"));
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
    this.appService.update(this.mode).subscribe(status => {});
  }

  setAir(): void {
    if (this.air.value == "off")
      this.air.value = "on";
    else
      this.air.value = "off";
    this.appService.update(this.air).subscribe(status => {});
  }

  setLight(): void {
    if (this.light.value == "off")
      this.light.value = "on";
    else
      this.light.value = "off";
    this.appService.update(this.light).subscribe(status => {});
  }

  toggleDoor(): void {
    if (this.door.value == "off")
      this.door.value = "on";
    else
      this.door.value = "off";
    this.appService.update(this.door).subscribe(status => {});
  }

  openDoor(): void {
    this.door.value = "on"
    this.appService.update(this.door).subscribe(status => console.log("(door) open"));
  }

  closeDoor(): void {
    this.door.value = "off"
    this.appService.update(this.door).subscribe(status => console.log("(door) close"));
  }

  isAuto(): boolean {
    return this.mode.value === "automatic";
  }

  open(): void {
    if (this.opened)
      this.opened = false
    else 
      this.opened = true
  }
}
