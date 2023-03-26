import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from "./map/map.component";
import { PageComponent } from "./page/page.component";


const routes: Routes = [
	{path: 'map', component: MapComponent},
	{path: 'page', component: MapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
