import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from "./map/map.component";
import { PageComponent } from "./page/page.component";
import { CityComponent } from "./city/city.component"


const routes: Routes = [
	{ path: 'map', component: MapComponent },
	{ path: 'city/:id', component: CityComponent },
	{ path: 'page', component: PageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
