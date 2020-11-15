import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {PangolinServices} from './services/managers/PangolinServices';
import {ROUTING} from './app.routing';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {HomeComponent} from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './services/security/auth.guard';
import {StorageService} from './services/security/storage.service';
import {GetPangolinResolver} from './services/resolvers/get.pangolin.resolver';
import {RegisterService} from './services/managers/RegisterService';
import {Toast, ToastrModule} from 'ngx-toastr';
import {IsAuthenticatedGuard} from './services/security/is.authenticated.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CdkTableModule} from '@angular/cdk/table';
import {GetAllUnknownPangolinResolver} from './services/resolvers/get.all.unknown.pangolin.resolver';
import {MyProfileComponent} from './profile/my.profile.component';
import {GetProfilePangolinResolver} from './services/resolvers/get.profile.pangolin.resolver';
import { EditProfileComponent } from './editProfile/edit.profile.component';
import {AlertComponent} from './alerteJumbotron/alert.component';
import {AlertService} from './services/common/AlertService';
import {AddComponent} from './add/add.component';


@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ]
})
export class DemoMaterialModule {
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MyProfileComponent,
    EditProfileComponent,
    RegisterComponent,
    HomeComponent,
    AlertComponent,
    AddComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ROUTING,
    FormsModule,
    NgbModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-left'
    }),
  ],
  providers: [
    AuthGuard,
    IsAuthenticatedGuard,
    PangolinServices,
    StorageService,
    RegisterService,
    GetPangolinResolver,
    GetAllUnknownPangolinResolver,
    GetProfilePangolinResolver,
    Toast,
    AlertService,
    NgbActiveModal
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
