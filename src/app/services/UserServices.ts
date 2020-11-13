import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '../../../node_modules/@angular/common/http';
import { environment } from '../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT'
  }),
  responseType: 'text' as 'text'
};

@Injectable({
  providedIn: 'root'
})
export class UserServices {
  // @ts-ignore
  url = environment.SERVER_URL;
  constructor(public http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.url + '/users');
  }
/*
  constructor(private service: UserServices) {
    this.service.getAll().subscribe(res => {
    });

environment.prod.ts
    SERVER_URL : 'https://appartoo-server.herokuapp.com',
 */

}
