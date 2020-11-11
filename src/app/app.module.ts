import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {PangolinServices} from './services/managers/PangolinServices';
import {ROUTING} from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ROUTING
  ],
  providers: [
    PangolinServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
