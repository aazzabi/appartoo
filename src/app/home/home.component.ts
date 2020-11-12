import {Component} from '@angular/core';
import {Pangolin} from '../models/Pangolin';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'home',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  pangolin: Pangolin;

  constructor(
    private router: Router,
    private route: ActivatedRoute) {
    this.pangolin = this.route.snapshot.data.pangolin;
  }
}
