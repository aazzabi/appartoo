import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import {Pangolin} from '../../models/Pangolin';

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
  // @ts-ignore
  url = environment.SERVER_URL;
  constructor(public http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.url + '/pangolins');
  }
  getById(id: number) {
    return this.http.get(this.url + '/pangolins/' + id);
  }
  update(p: Pangolin) {
    const body = JSON.stringify(p);
    return this.http.put(this.url + '/pangolins/update', p, httpOptions);
  }

/*
  constructor(private service: UserServices) {
    this.service.getAll().subscribe(res => {
      console.log(res);
    });

 */

}
