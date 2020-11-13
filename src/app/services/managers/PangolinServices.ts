import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {Pangolin} from '../../models/Pangolin';
import {StorageService} from '../security/storage.service';

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
  loggedUserID = StorageService.getUser().id;

  constructor(public http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.url + '/pangolins');
  }

  getById(id: any) {
    return this.http.get<Pangolin>(this.url + '/pangolins/' + id);
  }

  // tslint:disable-next-line:variable-name
  update(_id: any, name: string, pseudo: string, breed: string, weight: any, password?: string) {
    if (password) {
      return this.http.put(this.url + '/pangolins/update', {_id, name, pseudo, password, breed, weight}, httpOptions);
    } else {
      return this.http.put(this.url + '/pangolins/update', {_id, name, pseudo, breed, weight}, httpOptions);
    }
  }

  deletePangolinFromList(idPango: any) {
    return this.http.post(this.url + '/pangolins/removeFromList/' + this.loggedUserID + '/' + idPango, null, httpOptions);
  }

  getAllUnknownPangolin(id: any) {
    return this.http.get<Pangolin[]>(this.url + '/pangolins/getAllUnknownPangolin/' + id);
  }

  // pseudo is unique
  addPangolinsToListByPseudo(pseudo: any) {
    console.log(this.url + '/pangolins/addToList/' + this.loggedUserID + '/' + pseudo);
    return this.http.put(this.url + '/pangolins/addToList/' + this.loggedUserID + '/' + pseudo, null, httpOptions);
  }

  addPangolinsToList(id: any) {
    console.log(this.url + '/pangolins/addPangolinToList/' + this.loggedUserID + '/' + id);
    return this.http.get<any>(this.url + '/pangolins/addPangolinToList/' + this.loggedUserID + '/' + id);
  }


}
