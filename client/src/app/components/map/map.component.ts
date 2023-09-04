import { Component, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { geoMercator, geoOrthographic, GeoPath, geoPath, GeoProjection, select, Selection} from 'd3';
import { Point, FeatureCollection, Feature, Polygon, GeoJSON } from 'geojson';
import { map } from 'rxjs';

import { LocationsService } from 'src/app/services/locations/locations.service';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ["map.component.scss"]
})
export class MapComponent implements AfterViewInit {
	
	@ViewChild("canvas") 
	canvas_element!: ElementRef<HTMLCanvasElement>;


	readonly canvas_width: number = 1000;
	readonly canvas_height: number = 1127;

	private context2D : CanvasRenderingContext2D | null = null;
	
	private orthographic_projection !: GeoProjection;
	private orthographic_path !: GeoPath;
	private mercator_projection !: GeoProjection;
	private mercator_path !: GeoPath;
	private render_node !: Selection<SVGElement, unknown, HTMLElement, unknown>
	private selected: string | null = null;
	private jorGeoJson !: FeatureCollection<Polygon>
	private points !: FeatureCollection<Point>;
	
	constructor(
		private renderer: Renderer2,
		private router: Router,
		private change_detector: ChangeDetectorRef,
		public url: ActivatedRoute,
		private locations: LocationsService
	)
	{
		this.locations.getMap("jor", 0).subscribe(d => this.jorGeoJson = d as FeatureCollection<Polygon>);
		this.locations.getLocations()
		.pipe(map((d: GeoJSON)=> {return (d as FeatureCollection<Point>).features;}))
		.subscribe(d => this.points = d);

		this.orthographic_projection = geoOrthographic();
		this.orthographic_path = geoPath()
			.projection(this.orthographic_projection)
			.context(this.context2D);

		this.mercator_projection = geoMercator();
		this.mercator_path = geoPath()
			.projection(this.mercator_projection)
			.context(this.context2D);
	}
 
	ngOnInit()
	{
		this.url.fragment.subscribe((fragment: string | null) => {
			this.selected = fragment;
			this.change_detector.detectChanges();
		});

		this.render_node = select<SVGElement, unknown>(this.renderer.createElement("svg", "SVG"));

	}

	ngAfterViewInit()
	{	
		this.context2D = this.canvas_element.nativeElement.getContext("2d");
	}

	//async onClick(e:Event)
	//{
	//	//update map
	//	//const element = e.target as SVGGraphicsElement;
//
	//	//calculate zoom factor
	//	//const bb= element.getBBox(),
	//	//x = bb.x + bb.width/2,
	//	//y = bb.y + bb.height/2,
	//	//scale = Math.max(1, Math.min(8, 1/Math.max(bb.width /this.canvasDimensions[0], bb.height/this.canvasDimensions[1])));
//
	//	//await this.router.navigate([`/map`], { fragment: element.id });
//
	//	//this.canvasSelection?.transition()
	//	//	.duration(750)
	//	//	.call(this.zoomBehavior.transform, new ZoomTransform(scale, this.canvasDimensions[0]/2 - scale * x, this.canvasDimensions[1]/2 - scale * y));
	//	//
	//	//fill with markers		
	//	//const pointsSelection = select<SVGGElement, Feature<Point>>(this.points_element.nativeElement);
//
	//	//pointsSelection.selectAll("point").data(this.points)
	//	//	.enter()
	//	//	.filter((d : Feature<Point>) => d.properties?.['city'] === element.id)
	//	//	.append("tspan")
	//	//	.attr("class", "material-icons")
	//	//	.text("pin_drop")
	//	//	.attr("x", (d : Feature<Point>) => (this.projection(d.geometry.coordinates as [number, number]))![1])
	//	//	.attr("y", (d : Feature<Point>) => (this.projection(d.geometry.coordinates as [number, number]))![0])
	//	//	.on("click", (_e: MouseEvent, d : Feature<Point>) =>
	//	//		this.router.navigate(["pages", d.properties?.["URL"]])
	//	//	);
	//}

	onClose()
	{
		//this.router.navigate([`/map`])
		//this.canvasSelection?.transition().duration(750).call(this.zoomBehavior.transform, zoomIdentity);
	}

	ngOnDestroy()
	{
		//destroy all subscribers here
	}
}

