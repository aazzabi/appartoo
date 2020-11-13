import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Pangolin} from '../models/Pangolin';

@Component({
  selector: 'my-profile',
  templateUrl: './my.profile.component.html',
  styleUrls: ['./my.profile.component.css'],
})
export class MyProfileComponent {
  title = 'client';
  profile: Pangolin;

  constructor( private router: Router, private  route: ActivatedRoute) {
    this.profile = this.route.snapshot.data.profile;
  }
}
