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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ROUTING,
    FormsModule,
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
    Toast
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
