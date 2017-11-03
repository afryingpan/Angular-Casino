import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-chips',
	templateUrl: './chips.component.html',
	styleUrls: ['./chips.component.css']
})
export class ChipsComponent {

	@Input('purpChips') purpChips: number[];
	@Input('redChips') redChips: number[];
	@Input('greenChips') greenChips: number[];
	@Input('blueChips') blueChips: number[];

}
