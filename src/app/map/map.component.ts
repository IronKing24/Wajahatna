import { Component, AfterViewInit, ViewChildren, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.svg',
	styleUrls: ["map.component.scss"]
})
export class MapComponent implements AfterViewInit {

	@Input() location:string | undefined;
	petra = "petra"
	constructor(private router: Router)
	{
	}

	ngAfterViewInit(): void { 
		let pathList = document.querySelectorAll("path")
		//let nameGroup = document.getElementById("text")
		//let mapSvg = document.getElementById("map")

		pathList?.forEach(element => {
			element.addEventListener("mouseover", function () {
				element.style.fill = "red";
			})
			element.addEventListener('mouseout', function () {
				element.style.fill = "";
			});
			element.addEventListener('click', function (){
				element.style.fill = "green";
				console.log(element.id)
				//nameGroup?.setAttribute("visibility", "hidden");
				//pathList?.forEach(path => {
				//	if(element !== path)
				//	{
				//		path.setAttribute("visibility", "hidden");
				//		
				//	}
				//});
			});
		});
	}
}