import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MapComponent } from './map.component';
import { SidePanelComponent } from './sidepanel.component';

@NgModule({
	declarations: [
		AppComponent,
		MapComponent,
		SidePanelComponent
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
