import { Injectable } from '@angular/core';
import { Http }           from '@angular/http';
import { Status } from './status';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {
  private api = 'api/data';  // URL to web api

  constructor(private http: Http) { }

  getMode(): Promise<Status> {
    return this.http.get(`${this.api}/0`)
      .toPromise()
      .then(response => {
        console.log(response);
        const obj = response.json().data as Status;
        console.log(obj);
        return obj;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
