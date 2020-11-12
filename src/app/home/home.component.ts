import {Component} from '@angular/core';
import {Pangolin} from '../models/Pangolin';
import {ActivatedRoute, Router} from '@angular/router';
import {PangolinServices} from '../services/managers/PangolinServices';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {StorageService} from '../services/security/storage.service';

export class State {
  constructor(public name: string, public population: string, public flag: string) {
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  pangolin: Pangolin;
  allUnknownPangolin: Pangolin[];
  p: Pangolin;

  pangolinCtrl;
  filteredPangolins;

  states: State[] = [
    {
      name: 'Arafet',
      population: '0.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  constructor(
    private pangolinService: PangolinServices,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute) {
    this.pangolin = this.route.snapshot.data.pangolin;
    this.allUnknownPangolin = this.route.snapshot.data.allUnknownPangolin;
    this.pangolinCtrl = new FormControl();
    this.filterUnknownPangolins();
  }

  getPangolinDetails() {
    this.pangolinService.getById(StorageService.getUser().id).subscribe((data) => {
      this.pangolin = data;
    });
  }

  deletePangolin(contact: any, i: number) {
    this.pangolinService.deletePangolinFromList(contact._id).subscribe((data) => {
      // tslint:disable-next-line:no-shadowed-variable
      this.pangolinService.getAllUnknownPangolin(StorageService.getUser().id).subscribe((data) => {
        this.allUnknownPangolin = data;
        this.filterUnknownPangolins();
      });

      this.getPangolinDetails();
    });
  }

  addPangolin() {
    console.log(this.pangolinCtrl.value);
    this.pangolinService.addPangolinsToListByPseudo(this.pangolinCtrl.value);
    this.getPangolinDetails();
    this.filterUnknownPangolins();
  }

  filterUnknownPangolins() {
    this.filteredPangolins = this.pangolinCtrl.valueChanges
      .pipe(
        startWith(''),
        map(pangolin => pangolin ? this.doFilter(pangolin.toString()) : this.allUnknownPangolin.slice())
      );
  }

  doFilter(name: string) {
    return this.allUnknownPangolin.filter(p =>
      p.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
}
