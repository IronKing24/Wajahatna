import { Component, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { geoMercator, GeoPath, geoPath, GeoProjection, select, Selection, zoom, ZoomBehavior, zoomIdentity, ZoomTransform } from 'd3';
import { Point, FeatureCollection, Feature, Polygon } from 'geojson';

import JordanGeoJson from "src/assets/data/geoBoundaries-JOR-ADM0.json"
import JordanPoints from "src/assets/data/points.json" 

@Component({
	selector: 'app-map',
	templateUrl: './map.component.svg',
	styleUrls: ["map.component.scss"]
})
export class MapComponent implements AfterViewInit {
	
	private jorGeoJson : FeatureCollection<Polygon> =  JordanGeoJson as FeatureCollection<Polygon>;
	private points : FeatureCollection<Point> =  JordanPoints as FeatureCollection<Point>;

	@ViewChild("map_element") 
	map_element!: ElementRef<SVGGElement>;
	@ViewChild("map_container")
	map_container!: ElementRef<SVGSVGElement>;
	@ViewChild("points_element")  
	points_element!: ElementRef<SVGGElement>;

	svgDimensions: [[number, number], [number, number]] = [[0, 0], [1000, 1127]]
	canvasDimensions: [number, number] = [1000, 1127]
	
	public selected: string | null = null;

	private canvasSelection !: Selection<SVGSVGElement, unknown, null, any>;
	private mapSelection !: Selection<SVGGElement, unknown, null, any>;

	private zoomBehavior : ZoomBehavior<SVGSVGElement, unknown> = zoom<SVGSVGElement, unknown>()
	.on("zoom", (e) => this.mapSelection?.attr("transform", e.transform))
	.scaleExtent([1,8]);

	private projection : GeoProjection = geoMercator()
	.fitExtent(this.svgDimensions, this.jorGeoJson)
	private path : GeoPath = geoPath()
	.projection(this.projection);
	

	constructor(
		private router: Router,
		private changedetector: ChangeDetectorRef,
		public url:ActivatedRoute
	)
	{}

	ngOnInit()
	{
		this.url.fragment.subscribe((fragment: string | null) => {
			this.selected = fragment;
			this.changedetector.detectChanges();
		});
	}

	ngAfterViewInit()
	{	
		this.canvasSelection = select<SVGSVGElement, unknown>(this.map_container.nativeElement).call(this.zoomBehavior);
		this.mapSelection = select<SVGGElement, unknown>(this.map_element.nativeElement);
	}

	async onClick(e:Event)
	{
		//update map
		const element = e.target as SVGGraphicsElement;

		//calculate zoom factor
		let bb= element.getBBox(),
		x = bb.x + bb.width/2,
		y = bb.y + bb.height/2,
		scale = Math.max(1, Math.min(8, 1/Math.max(bb.width /this.canvasDimensions[0], bb.height/this.canvasDimensions[1])));

		await this.router.navigate([`/map`], { fragment: element.id });
		
		this.canvasSelection?.transition().duration(750).call(this.zoomBehavior.transform, new ZoomTransform(scale, this.canvasDimensions[0]/2 - scale * x, this.canvasDimensions[1]/2 - scale * y));
		
		//fill with markers		
		let pointsSelection = select<SVGGElement, Feature<Point>>(this.points_element.nativeElement);

		pointsSelection.selectAll("point").data(this.points.features)
		.enter()
		.filter((d : Feature<Point>) => d.properties?.['city'] === element.id)
		.append("use")
		.attr("class", "pin")
		.attr("href", "#pin")
		.attr("transform", (d : Feature<Point>) =>
			 `translate(${this.projection(d.geometry.coordinates as [number, number])}), scale(.1)`
		)
		.on("click", (e: MouseEvent, d : Feature<Point>) =>
			this.router.navigate(["pages", d.properties?.["city"], d.properties?.["URL"]])
		)
	}

	onClose()
	{
		this.router.navigate([`/map`])
		this.canvasSelection?.transition().duration(750).call(this.zoomBehavior.transform, zoomIdentity);
	}
}

