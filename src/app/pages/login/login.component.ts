import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/security/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../services/common/AlertService';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login-cmp',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  public data: any = [];

  constructor(private alertService: AlertService, private loginService: LoginService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  Login() {
    this.loginService.login(this.model.pseudo, this.model.password)
      .subscribe(
        (response: any) => {
          this.router.navigate(['/']);
        },
        error => {
            this.alertService.error('Veuillez verifier les attributs');
        }
      );
  }
}
