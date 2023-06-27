import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser'

@Component({
	selector: 'app-page',
	templateUrl: './page.component.html',
	styleUrls: ['./page.component.scss']
})
export class PageComponent {
	Html: SafeHtml | undefined;

	constructor(
		public url:ActivatedRoute,
		public sanitizer:DomSanitizer
	)
	{}

	ngOnInit()
	{
		console.log(this.url.toString());
		this.Html = this.sanitizer.bypassSecurityTrustHtml(this.url.toString());
		
		
	}
}