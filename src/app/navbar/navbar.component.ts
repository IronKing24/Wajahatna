import { animate, state, style, transition, trigger } from '@angular/animations';
import {Component} from '@angular/core';


@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	animations: [
		trigger('openClosePane',[
			state("closed", style({ transform: "translateX(-90 %)"})),
			state("open", style({ transform: "translateX(0 %)" })),
			transition("open <=> closed", animate("0.06s ease-in-out"))
		])
	]
})
export class NavbarComponent {
	public visible: boolean = false;
	public symbol: string = "≡";

	onBtnClick()
	{
		this.visible = !this.visible;
		this.symbol = (this.visible) ? "x" : "≡";
	}
}

animations: [
	trigger('openClose', [
		state('open', style({
			height: '200px',
			opacity: 1,
			backgroundColor: 'yellow'
		})),
		state('closed', style({
			height: '100px',
			opacity: 0.8,
			backgroundColor: 'blue'
		})),
		transition('open => closed', [
			animate('1s')
		]),
		transition('closed => open', [
			animate('0.5s')
		]),
	]),
]
