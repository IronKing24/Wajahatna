import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';


@Component({
	selector: 'side-panel',
	templateUrl: './sidepanel.component.html',
	styleUrls: ['./sidepanel.component.scss'],
	animations: [
		trigger("openClosePane",[
			state("false", style({ 
				transform: "translateX(-90%)"
			})),
			state("true", style({ 
				transform: "translateX(0%)"
			})),
			transition("true <=> false", animate("0.06s ease-in-out"))
		])
	]
})
export class SidePanelComponent {
	public visible: boolean = false;
	public symbol: string = "≡";

	public onBtnClick(): void
	{
		console.log("clicked!!!")
		this.visible = !this.visible;
		this.symbol = (this.visible) ? "x" : "≡";
	}
}
