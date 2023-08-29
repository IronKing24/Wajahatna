import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { PageComponent } from './components/page/page.component';

import {LocationsService} from './services/locations/locations.service'

import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon';
import { IonicModule } from '@ionic/angular'; 

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
		MapComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		
		MatToolbarModule,
		MatSidenavModule,
		MatButtonModule,
		MatIconModule,
		IonicModule.forRoot()
  ],
  providers: [
    LocationsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
