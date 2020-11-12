import {Component} from '@angular/core';
import {Pangolin} from '../models/Pangolin';
import {ActivatedRoute, Router} from '@angular/router';
import {PangolinServices} from '../services/managers/PangolinServices';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  pangolin: Pangolin;
  p: Pangolin;

  constructor(
    private pangolinService: PangolinServices,
    private router: Router,
    private route: ActivatedRoute) {
    this.pangolin = this.route.snapshot.data.pangolin;
  }

  editPangolin(contact: any, i: number) {
    console.log(contact, i);
  }

  deletePangolin(contact: any, i: number) {

  }
}
