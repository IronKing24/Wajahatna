import { Component, OnInit , AfterViewInit, ViewChildren, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { svg, select } from 'd3';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ["map.component.scss"]
})
export class MapComponent implements OnInit, AfterViewInit {

	svgHTML: SafeHtml | undefined;

	constructor(
		private router: Router,
		private sanitizer: DomSanitizer
		)
	{
	}

	async ngOnInit()
	{
		try {
			await svg("assets/images/map.svg")
				.then(
					(svgFile) => {
						const svg = this.sanitizer.bypassSecurityTrustHtml(svgFile.documentElement.innerHTML)
						this.svgHTML = svg;
					},
					() => {
						console.warn("Wasn't able to load map SVG.");
					}
				);
		} catch (error) {
			console.warn(error)
		}
	}

	ngAfterViewInit(){

		

		let pathList = document.querySelectorAll("path")
		let nameGroup = document.getElementById("text")
		let mapSvg = document.getElementById("map")

		pathList?.forEach(element => {
			element.addEventListener("mouseover", function () {
				element.style.fill = "red";
			})
			element.addEventListener('mouseout', function () {
				element.style.fill = "";
			});
			element.addEventListener('click', function (){
				element.style.fill = "green";
				
				nameGroup?.setAttribute("visibility", "hidden");
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