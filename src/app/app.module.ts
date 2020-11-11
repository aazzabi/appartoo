import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {UserServices} from './services/UserServices';
import {HttpClientModule} from '@angular/common/http';
import {PangolinServices} from './services/PangolinServices';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [
    PangolinServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
