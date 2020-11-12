import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {PangolinServices} from './services/managers/PangolinServices';
import {ROUTING} from './app.routing';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {HomeComponent} from './home/home.component';
import {FormsModule} from '@angular/forms';
import {AuthGuard} from './services/security/auth.guard';

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
    FormsModule
  ],
  providers: [
    AuthGuard,
    PangolinServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
