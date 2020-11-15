import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Pangolin} from '../models/Pangolin';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/security/login.service';
import {ToastrService} from 'ngx-toastr';
import {MustMatch} from '../pages/register/MustMatch';
import {PangolinServices} from '../services/managers/PangolinServices';
import {AlertService} from '../services/common/AlertService';
import {RegisterService} from '../services/managers/RegisterService';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {StorageService} from '../services/security/storage.service';

@Component({
  selector: 'add-profile',
  templateUrl: './add.component.html',
})
export class AddComponent implements OnInit{
  addPangolin: FormGroup;
  title = 'client';
  profile: Pangolin;
  url = environment.SERVER_URL;
  loggedUserID = StorageService.getUser().id;

  constructor(private pangolinService: PangolinServices,
              private alertService: AlertService,
              private registerService: RegisterService,
              private loginService: LoginService,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private toast: ToastrService,
              private router: Router,
              private  route: ActivatedRoute) {
  }

  submitted = false;
  p: Pangolin;


  ngOnInit() {
    this.addPangolin = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      pseudo: new FormControl('', Validators.required),
      breed: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      weight: new FormControl('', [Validators.required, Validators.max(99999999)]),
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() {
    return this.addPangolin.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.p = new Pangolin(
      this.addPangolin.value.name,
      this.addPangolin.value.pseudo,
      this.addPangolin.value.password,
      this.addPangolin.value.breed,
      this.addPangolin.value.weight,
      this.addPangolin.value.phone,
      this.addPangolin.value.address);
    this.registerService.register(this.p)
      .subscribe(
        response => {
          var obj = JSON.parse(response);
          console.log(obj)
          console.log(this.url + '/pangolins/addPangolinToList/' + this.loggedUserID + '/' + obj.id)
          this.http.get<any>(this.url + '/pangolins/addPangolinToList/' + this.loggedUserID + '/' + obj.id)
            .subscribe((data) => {
              console.log(data);
                this.router.navigate(['/']);
              },
              error => console.log(error)
            );
          this.router.navigate(['/login']);

        },
        error => {
        }
      );
  }
}
