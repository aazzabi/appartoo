import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {StorageService} from './storage.service';
import {Pangolin} from '../../models/Pangolin';
import {Tokens} from '../../models/Tokens';

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
export class LoginService {

  constructor(private http: HttpClient) {
    this.currentPangolinSubject = new BehaviorSubject<Pangolin>(JSON.parse(localStorage.getItem('currentPangolin')));
    this.currentPangolin = this.currentPangolinSubject.asObservable();
  }

  public get currentPangolinValue(): Pangolin {
    return this.currentPangolinSubject.value;
  }

  public static loggedPangolinId: number;
  private currentPangolinSubject: BehaviorSubject<Pangolin>;
  public currentPangolin: Observable<Pangolin>;

  apiUrl2 = 'http://localhost:3333/';

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedPangolin: string;
  public token: string;

  static isLogged() {
    return !!StorageService.get('currentPangolin');
  }

  login(pseudo: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('pseudo', pseudo)
      .set('password', password);
    return this.http
      .post(this.apiUrl2 + 'login', body, httpOptions)
      .pipe(map(objectJson => {
          const response = JSON.parse(objectJson);
          const t = response && response.token;
          if (t && response.status === 200) {
            // set token property

            // store email and jwt token in local storage to keep user logged in between page refreshes
            const expires = 1000 * 60 * 30;
            StorageService.set('currentPangolin', {
                token: t,
              },
              expires);
            return true;
          } else {
            // return false to indicate failed login
            return false;
          }
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentPangolin');
    this.currentPangolinSubject.next(null);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginPangolin(email: string, tokens: Tokens) {
    this.loggedPangolin = email;
    this.storeTokens(tokens);
  }

  private doLogoutPangolin() {
    this.loggedPangolin = null;
    this.removeTokens();
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
  }
}
