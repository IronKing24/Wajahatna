import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent {
	public city : string | null = "";

	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
		this.city = this.route.snapshot.paramMap.get("id");
		console.log(this.city)
	}
}
