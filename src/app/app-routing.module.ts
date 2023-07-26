import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from "./components/map/map.component";
import { PageComponent } from "./components/page/page.component";


const routes: Routes = [
	{ path: 'map', component: MapComponent },
	{ path: 'pages/:city/:location', component: PageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
