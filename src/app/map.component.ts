import { Component, AfterViewInit, ViewChildren } from '@angular/core';

@Component({
	selector: 'map-view',
	templateUrl: './map.component.svg',
	styleUrls: ["map.component.scss"]
})
export class MapComponent implements AfterViewInit {
	ngAfterViewInit(): void {
		let selected_item: SVGPathElement;
		let pathList = document.querySelectorAll("path")
		let nameGroup = document.getElementById("text")
		//let mapSvg = document.getElementById("map")

		pathList?.forEach(element => {
			element.addEventListener("mouseover", function () {
				element.style.fill = "red";
			})
			element.addEventListener('mouseout', function () {
				element.style.fill = "";
			});
			element.addEventListener('click', function (){
				if(element !== selected_item)
				{

				}
				element.style.fill = "green";
				nameGroup?.setAttribute("visibility", "hidden");
				pathList?.forEach(path => {
					if(element !== path)
					{
						path.setAttribute("visibility", "hidden");
					}
				});
				selected_item = element;
			});
		});
	}
}