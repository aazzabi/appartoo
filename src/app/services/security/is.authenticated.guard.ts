import { Injectable } from '@angular/core';
import {LoginService} from './login.service';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {
  private isSignedIn: boolean = true;

  constructor(
    private router: Router
  ) {}

  canActivate(){
    if (!LoginService.isLogged()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
