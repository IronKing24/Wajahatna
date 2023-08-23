import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { PageComponent } from './components/page/page.component';
import { HttpClientModule } from '@angular/common/http';

import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon'; 


@NgModule({
	declarations: [
		AppComponent,
		MapComponent,
		SidePanelComponent,
  		PageComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		
		MatToolbarModule,
		MatSidenavModule,
		MatButtonModule,
		MatIconModule
	],
	providers: [],
	bootstrap: [
		AppComponent
	]
})
export class AppModule
{

}
