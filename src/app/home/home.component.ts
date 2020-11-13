import {Component} from '@angular/core';
import {Pangolin} from '../models/Pangolin';
import {ActivatedRoute, Router} from '@angular/router';
import {PangolinServices} from '../services/managers/PangolinServices';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {StorageService} from '../services/security/storage.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

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

  url = environment.SERVER_URL;
  loggedUserID = StorageService.getUser().id;

  constructor(
    private pangolinService: PangolinServices,
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal,
    private route: ActivatedRoute) {
      this.pangolin = this.route.snapshot.data.pangolin;
      this.allUnknownPangolin = this.route.snapshot.data.allUnknownPangolin;
      this.pangolinCtrl = new FormControl();
      this.filterUnknownPangolins();
  }

  // récuperer les détails du pangolin
  getPangolinDetails() {
    this.pangolinService.getById(StorageService.getUser().id).subscribe((data) => {
      this.pangolin = data;
    });
  }

  // récuperer les pangolins qui ne sont pas encore ajouter au carnet d'adresse
  getUnkownPangolin() {
    this.pangolinService.getAllUnknownPangolin(StorageService.getUser().id).subscribe((data) => {
      this.allUnknownPangolin = data;
      this.filterUnknownPangolins();
    });
  }

  deletePangolin(contact: any, i: number) {
    this.pangolinService.deletePangolinFromList(contact._id).subscribe((data) => {
      // tslint:disable-next-line:no-shadowed-variable
      this.getUnkownPangolin();
      this.getPangolinDetails();
    });
  }

  // action d'ajout de pangolin à la liste
  addPangolin() {
    this.http.get<any>(this.url + '/pangolins/addPangolinToList/' + this.loggedUserID + '/' + this.pangolinCtrl.value._id)
      .subscribe((data) => {
          // mise a jour des détails du pangolin
          this.getPangolinDetails();
          // mettre a jour la liste deroulante
          this.getUnkownPangolin();
        },
        error => console.log(error)
      );
  }

  // filtre d'autocomplete
  filterUnknownPangolins() {
    this.filteredPangolins = this.pangolinCtrl.valueChanges
      .pipe(
        startWith(''),
        map(pangolin => pangolin ? this.doFilter(pangolin.toString()) : this.allUnknownPangolin.slice())
      );
  }

  doFilter(name: string) {
    return this.allUnknownPangolin.filter(p => p.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
}
