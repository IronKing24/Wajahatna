import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

	@ViewChild(MatSidenav) 
	sidenavContainer!:MatSidenav

	constructor(
		private router: Router,
		private breakpoint: BreakpointObserver)
	{}
	
	ngOnInit(): void 
	{
		this.router.navigate(["/map"]);
		this.breakpoint.observe(Breakpoints.HandsetLandscape).subscribe(result => {
        if (result.matches) {
          console.log(result);
        }});

		//this.sidenavContainer.scrollable.elementScrolled().subscribe(()=>{
		//})
	}


}

