import { Component, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { geoMercator, GeoPath, geoPath, GeoProjection, select, Selection, zoom, ZoomBehavior, zoomIdentity, ZoomTransform } from 'd3';
import { Point, FeatureCollection, Feature, Polygon, GeoJSON } from 'geojson';
import { map } from 'rxjs';

import { LocationsService } from 'src/app/services/locations/locations.service';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.svg',
	//styleUrls: ["map.component.scss"]
})
export class MapComponent implements AfterViewInit {
	
	private jorGeoJson !: FeatureCollection<Polygon>
	private points !: Feature<Point>[];

	@ViewChild("map_element") 
	map_element!: ElementRef<SVGGElement>;
	@ViewChild("map_container")
	map_container!: ElementRef<SVGSVGElement>;
	@ViewChild("points_element")  
	points_element!: ElementRef<SVGGElement>;

	readonly canvasDimensions: [number, number] = [1000, 1127]
	
	public selected: string | null = null;

	private canvasSelection !: Selection<SVGSVGElement, unknown, null, unknown>;
	private mapSelection !: Selection<SVGGElement, unknown, null, unknown>;
	private globe_projection !: GeoProjection;
	private projection !: GeoProjection;
	private path !: GeoPath;
	private zoomBehavior !: ZoomBehavior<SVGSVGElement, unknown>;
	

	constructor(
		private router: Router,
		private change_detector: ChangeDetectorRef,
		public url: ActivatedRoute,
		private locations: LocationsService
	)
	{
		this.locations.getMap().subscribe(d => this.jorGeoJson = d as FeatureCollection<Polygon>);
		this.locations.getLocations()
		.pipe(map((d: GeoJSON)=> {return (d as FeatureCollection<Point>).features;}))
		.subscribe(d => this.points = d);

		


		this.projection = geoMercator().fitSize(this.canvasDimensions, this.jorGeoJson);
		this.path = geoPath().projection(this.projection);
		this.zoomBehavior = zoom<SVGSVGElement, unknown>()
		.on("zoom", (e) => this.mapSelection?.attr("transform", e.transform))
		.scaleExtent([1,8]);
	}
 
	ngOnInit()
	{
		this.url.fragment.subscribe((fragment: string | null) => {
			this.selected = fragment;
			this.change_detector.detectChanges();
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
		const bb= element.getBBox(),
		x = bb.x + bb.width/2,
		y = bb.y + bb.height/2,
		scale = Math.max(1, Math.min(8, 1/Math.max(bb.width /this.canvasDimensions[0], bb.height/this.canvasDimensions[1])));

		await this.router.navigate([`/map`], { fragment: element.id });
		
		this.canvasSelection?.transition()
			.duration(750)
			.call(this.zoomBehavior.transform, new ZoomTransform(scale, this.canvasDimensions[0]/2 - scale * x, this.canvasDimensions[1]/2 - scale * y));
		
		//fill with markers		
		const pointsSelection = select<SVGGElement, Feature<Point>>(this.points_element.nativeElement);

		pointsSelection.selectAll("point").data(this.points)
			.enter()
			.filter((d : Feature<Point>) => d.properties?.['city'] === element.id)
			.append("tspan")
			.attr("class", "material-icons")
			.text("pin_drop")
			.attr("x", (d : Feature<Point>) => (this.projection(d.geometry.coordinates as [number, number]))![1])
			.attr("y", (d : Feature<Point>) => (this.projection(d.geometry.coordinates as [number, number]))![0])
			.on("click", (_e: MouseEvent, d : Feature<Point>) =>
				this.router.navigate(["pages", d.properties?.["URL"]])
			);
	}

	onClose()
	{
		this.router.navigate([`/map`])
		this.canvasSelection?.transition().duration(750).call(this.zoomBehavior.transform, zoomIdentity);
	}

	ngOnDestroy()
	{
		//destroy all subscribers here
	}
}

