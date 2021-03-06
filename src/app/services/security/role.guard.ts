import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {StorageService} from './storage.service';

// import {LoginService} from './login.service';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private router: Router,
  ) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!StorageService.get('userToken')) {
        const rolesAllowed = next.data.roles as Array<string>;
        const user = StorageService.get('currentUser');
        if (rolesAllowed) {
            // check if user is allowed
            const match = rolesAllowed.find(ob => ob === user.role);
            if (match != null) {
              return true;
            } else {
              this.router.navigate(['/']);
              return false;
            }
        } else {
          this.router.navigate(['/']);
        }
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }
}
