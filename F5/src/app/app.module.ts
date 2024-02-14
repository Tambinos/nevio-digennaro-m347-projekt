import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ContentLinkComponent} from "./components/content-link/content-link.component";
import {HomeComponent} from "./components/home/home.component";
import {BicycleComponent} from './components/bicycle/bicycle.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NewBicycleComponent} from './components/new-bicycle/new-bicycle.component';
import {SearchBicycleComponent} from './components/search-bicycle/search-bicycle.component';
import {BrandComponent} from './components/brand/brand.component';
import {BicycleValuePipe} from './pipes/bicycle-value.pipe';
import { BrandCopyrightPipe } from './pipes/brand-copyright.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContentLinkComponent,
    HomeComponent,
    BicycleComponent,
    NewBicycleComponent,
    SearchBicycleComponent,
    BrandComponent,
    BicycleValuePipe,
    BrandCopyrightPipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule],
  providers: [NewBicycleComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
