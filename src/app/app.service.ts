import { Injectable } from '@angular/core';
import { Http, Headers }           from '@angular/http';
import { Status } from './status';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private api = 'api/data';  // URL to web api

  constructor(private http: Http) { }

  getMode(): Promise<Status> {
    return this.http.get(`${this.api}/0`)
      .toPromise()
      .then(response => response.json().data as Status)
      .catch(this.handleError);
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
