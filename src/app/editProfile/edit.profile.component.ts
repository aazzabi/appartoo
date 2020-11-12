import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Pangolin} from '../models/Pangolin';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/security/login.service';
import {ToastrService} from 'ngx-toastr';
import {MustMatch} from '../pages/register/MustMatch';
import {PangolinServices} from '../services/managers/PangolinServices';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit.profile.component.html',
})
export class EditProfileComponent {
  title = 'client';
  profile: Pangolin;

  constructor(private pangolinService: PangolinServices,
              private loginService: LoginService,
              private formBuilder: FormBuilder,
              private toast: ToastrService,
              private router: Router,
              private  route: ActivatedRoute) {
    this.profile = this.route.snapshot.data.profile;
    console.log(this.profile);
  }

  editProfile: FormGroup;
  submitted = false;
  p: Pangolin;


  ngOnInit() {
    this.editProfile = this.formBuilder.group({
      name: new FormControl(this.profile.name, Validators.required),
      pseudo: new FormControl(this.profile.pseudo, Validators.required),
      breed: new FormControl(this.profile.breed, Validators.required),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      weight: new FormControl(this.profile.weight, [Validators.required, Validators.max(99999999)]),
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() {
    return this.editProfile.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.pangolinService.update(
      this.profile._id,
      this.editProfile.value.name,
      this.editProfile.value.pseudo,
      this.editProfile.value.breed,
      this.editProfile.value.weight,
      this.editProfile.value.password).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/profile']);
      },
      error => {
        console.log(error);
      });

    // if (this.editProfile.value.password && this.editProfile.value.confirmPassword) {
    //   console.log(this.editProfile.value);
    //   var p = {
    //     _id: this.profile._id,
    //     name: this.editProfile.value.name,
    //     pseudo: this.editProfile.value.pseudo,
    //     password: this.editProfile.value.password,
    //     breed: this.editProfile.value.breed,
    //     weight: this.editProfile.value.weight
    //   }
    //   console.log(p);
    //   this.pangolinService.update(p).subscribe(
    //     response => {
    //       console.log(response);
    //       this.router.navigate(['/profile']);},
    //       error => {console.log(error);
    //     });
    // } else {
    //   var p = {
    //     _id: this.profile._id,
    //     name: this.editProfile.value.name,
    //     pseudo: this.editProfile.value.pseudo,
    //     password: this.editProfile.value.password,
    //     breed: this.editProfile.value.breed,
    //     weight: this.editProfile.value.weight
    //   }
    //   console.log(p);
    //   this.pangolinService.update(p).subscribe(
    //       response => {
    //         console.log(response);
    //         this.router.navigate(['/profile']); },
    //       error => {console.log(error); }
    //     );
    // }

  }
}
