import { Component, ElementRef, SecurityContext, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser'
import { HttpClient } from '@angular/common/http';


@Component({
	selector: 'app-page',
	templateUrl: './page.component.html',
	styleUrls: ['./page.component.scss']
})
export class PageComponent implements AfterViewInit{
	
	@ViewChild("Container") 
	content!: ElementRef<HTMLElement>;

	constructor(
		public route:ActivatedRoute,
		private http: HttpClient,
		public sanitizer:DomSanitizer
	)
	{}

	ngAfterViewInit()
	{ 
		this.http.get("assets/" + this.route.snapshot.url.join('/') + ".html",
			{ responseType: 'text' })
		.subscribe(data => {
			const cleanData =  this.sanitizer.sanitize(SecurityContext.HTML, data)
			if(cleanData == null)
			{
				this.content.nativeElement.innerHTML = "<h1>404 Page Not Found</h1>"
			}
			else
			{
				this.content.nativeElement.innerHTML = cleanData;
			}
			
		});
	}
}