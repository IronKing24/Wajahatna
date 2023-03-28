import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { HeaderBannerComponent } from './header-banner/header-banner.component';
import { PageComponent } from './page/page.component';
import { CityComponent } from './city/city.component';

@NgModule({
	declarations: [
		AppComponent,
		MapComponent,
		SidePanelComponent,
		HeaderBannerComponent,
  PageComponent,
  CityComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule 
	],
	providers: [],
	bootstrap: [
		AppComponent
	]
})
export class AppModule
{

}
