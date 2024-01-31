import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ContentLinkComponent} from "./components/content-link/content-link.component";
import {HomeComponent} from "./components/home/home.component";
import { DefaultComponent } from './components/default/default.component';
import { BicycleComponent } from './components/bicycle/bicycle.component';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ContentLinkComponent,
    HomeComponent,
    DefaultComponent,
    BicycleComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
