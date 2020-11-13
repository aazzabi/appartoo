import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Pangolin} from '../../models/Pangolin';
import {environment} from '../../../environments/environment.prod';
import {StorageService} from '../security/storage.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT'
  }),
  responseType: 'text' as 'text'
};

@Injectable()
export class RegisterService {
  url = environment.SERVER_URL;

  constructor(private http: HttpClient) {
  }

  register(u: Pangolin) {
    const body = JSON.stringify(u);
    return this.http.post(this.url + '/register', body, httpOptions);
  }

}
