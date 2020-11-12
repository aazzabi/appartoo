import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Pangolin} from '../../models/Pangolin';
import {environment} from '../../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT'
  }),
  responseType: 'text' as 'text'
};

@Injectable()
export class RegisterService {
  constructor(private http: HttpClient) {
  }

  register(u: Pangolin) {
    console.log(u);
    const body = JSON.stringify(u);
    return this.http.post(environment.SERVER_URL + '/register', body, httpOptions);
  }

}
