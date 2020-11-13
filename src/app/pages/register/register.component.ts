import {Component, OnInit} from '@angular/core';
import {RegisterService} from '../../services/managers/RegisterService';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {MustMatch} from './MustMatch';
import {Pangolin} from '../../models/Pangolin';
import {LoginService} from '../../services/security/login.service';
import {StorageService} from '../../services/security/storage.service';


@Component({
  selector: 'register-cmp',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  submitted = false;
  p: Pangolin;

  constructor(private registerService: RegisterService,
              private loginService: LoginService,
              private formBuilder: FormBuilder,
              private router: Router, private toast: ToastrService) {
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      pseudo: new FormControl('', Validators.required),
      breed: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      weight: new FormControl('', [Validators.required, Validators.max(99999999)]),
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.toast.success('Success');

    this.p = new Pangolin(
      this.registerForm.value.name,
      this.registerForm.value.pseudo,
      this.registerForm.value.password,
      this.registerForm.value.breed,
      this.registerForm.value.weight);
    this.registerService.register(this.p)
      .subscribe(
        response => {
          this.router.navigate(['/login']);
        },
        error => {
        }
      );

  }

}
