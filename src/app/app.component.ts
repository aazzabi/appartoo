import {Component} from '@angular/core';
import {UserServices} from './services/UserServices';
import {LoginService} from './services/security/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor( private router: Router) {
  }
  logout() {
    localStorage.removeItem('currentPangolin');
    this.router.navigate(['/login']);
  }

  loggedUser() {
    return LoginService.isLogged();
  }
}
