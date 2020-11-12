import {Resolve, ActivatedRoute, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {StorageService} from '../security/storage.service';
import {Pangolin} from '../../models/Pangolin';
import {PangolinServices} from '../managers/PangolinServices';

@Injectable()
export class GetPangolinResolver implements Resolve<Pangolin> {
  constructor(private pangolinServices: PangolinServices) {}

  // @ts-ignore
  resolve(route: ActivatedRoute, state: RouterStateSnapshot): Observable<Pangolin> {
    return this.pangolinServices.getById(StorageService.getUser().id);
  }
}
