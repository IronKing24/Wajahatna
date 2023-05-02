import { animate, query, state, style, transition, trigger } from '@angular/animations';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {D3ZoomEvent, select, Selection, zoom, ZoomBehavior, zoomIdentity, ZoomTransform, zoomTransform } from 'd3';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.svg',
	styleUrls: ["map.component.scss"]
})
export class MapComponent implements AfterViewInit {
	
	public selected: string | undefined;

	@ViewChild('map')
	map!:ElementRef<SVGGraphicsElement>;

	private static mapSelection : Selection<SVGElement, unknown, HTMLElement, any>;
	private zoomBehavior !: ZoomBehavior<SVGElement, unknown>;


	constructor(
		private router: Router
		){}

	ngAfterViewInit()
	{	
		this.zoomBehavior = zoom<SVGElement, unknown>()
		.on("zoom", this.onZoom)
		.scaleExtent([1,8]);

		MapComponent.mapSelection = select<SVGElement, unknown>("#map");
		select<SVGElement, unknown>("#map_container").call(this.zoomBehavior);
	}

	onClick(e:Event)
	{
		const element = e.target as SVGGraphicsElement;
		this.selected  = "#" + element.id;
		
		let bb= element.getBBox(), 
		dx = bb.width,
		dy = bb.height,
		x = (bb.width + bb.x * 2) / 2,
		y = (bb.height + bb.y * 2)  / 2,
		scale = Math.max(1, Math.min(8, 1 / Math.max(dx / 500, dy / 500))),
		translate = [500 - scale * x, 500 - scale * y];

		//replace with angular anim
		MapComponent.mapSelection?.transition().duration(750).call(this.zoomBehavior.transform, new ZoomTransform(scale, 500 - scale * x, 500 - scale * y))
	}
	
	onClose()
	{
		this.selected = undefined;
		//replace with angular anim
		MapComponent.mapSelection?.transition().duration(750).call(this.zoomBehavior.transform, zoomIdentity)
	}
	
	onZoom(e: D3ZoomEvent<SVGElement, unknown>)
	{	
		MapComponent.mapSelection?.attr("transform", e.transform.toString());
	}
}

