import { Injectable }        from '@angular/core';
import { Http, Headers }           from '@angular/http';
// import { HttpClient }        from '@angular/common/http';
import { Status }            from './status';

import { Observable }        from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
  private headers = new Headers({

  });
  private api = '/data/workshop';  // URL to web api

  constructor(private jsonp: Http) { }

  get(id: number): Observable<string> {
    return this.jsonp.request(`${this.api}/${id}`, {
      method: 'GET',
      headers: this.headers
    }).map(response => response.text());
  }

  set(id: number, value: string): Observable<void> {
    return this.jsonp.request(`${this.api}/${id}/set/${value}`, {
      method: 'GET',
      headers: this.headers
    })
      .map(response => { });
  }

  getMode(): Observable<string> {
    return this.get(0);
  }

  getLight(): Observable<string> {
    return this.get(1);
  }

  getAir(): Observable<string> {
    return this.get(2);
  }

  getPerson(): Observable<string> {
    return this.get(3);
  }

  getTemperature(): Observable<string> {
    return this.get(4);
  }

  getDoor(): Observable<string> {
    return this.get(5);
  }

  getLightSensor(): Observable<string> {
    return this.get(6);
  }

  getSonic(): Observable<string> {
    return this.get(10);
  }

  update(status: Status): Observable<void> {
    return this.set(status.id, status.value);
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error); // for demo purposes only
    return null;
  }
}
