import { Injectable } from '@angular/core';
import { Http, Headers }           from '@angular/http';
import { Status } from './status';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private api = 'api/data';  // URL to web api

  constructor(private http: Http) { }

  get(id: number): Promise<Status> {
    return this.http.get(`${this.api}/${id}`)
      .toPromise()
      .then(response => response.json().data as Status)
      .catch(this.handleError);
  }

  getMode(): Promise<Status> {
    return this.get(0);
  }

  getLight(): Promise<Status> {
    return this.get(1);
  }

  getAir(): Promise<Status> {
    return this.get(2);
  }

  getPerson(): Promise<Status> {
    return this.get(3);
  }

  getTemperature(): Promise<Status> {
    return this.get(4);
  }

  update(status: Status): Promise<Status> {
    const url = `${this.api}/${status.id}`;
    return this.http
      .put(url, JSON.stringify(status), { headers: this.headers })
      .toPromise()
      .then(() => status)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
