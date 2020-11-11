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
export class PangolinServices {
  constructor(public http: HttpClient) {
  }

}
