export class Chips {

	public totalMoney: number;
	public purpleChips: number[];
	public redChips: number[];
	public blueChips: number[];
	public greenChips: number[];

	constructor() {
		this.purpleChips = [1];
		this.redChips = [1, 1, 1, 1, 1];
		this.blueChips = [1, 1, 1, 1, 1, 1];
		this.greenChips = [1, 1, 1, 1, 1, 1, 1, 1];
		this.totalMoney = this.calculateMoney();
	}

	public calculateMoney(): number {
		let money = 0;
		for (let i = 0; i < this.purpleChips.length; i++) {
			money += 500;
		}
		for (let j = 0; j < this.redChips.length; j++) {
			money += 100;
		}
		for (let k = 0; k < this.blueChips.length; k++) {
			money += 50;
		}
		for (let q = 0; q < this.greenChips.length; q++) {
			money += 25;
		}
		return money;
	}

	public winBet(betAmount: number): void {
		while (betAmount > 0) {

			if (betAmount >= 500) {
				betAmount -= 500;
				this.purpleChips.push(1);
			}

			if (betAmount >= 100) {
				betAmount -= 100;
				this.redChips.push(1);
			}

			if (betAmount >= 50) {
				betAmount -= 50;
				this.blueChips.push(1);
			}

			if (betAmount >= 25) {
				betAmount -= 25;
				this.greenChips.push(1);
			}
		}
	}

	public loseBet(betAmount: number): void {

		// Safegaurd in case I don't catch a bad bet amount somewhere closer to the source
		if (betAmount > this.totalMoney) {
			betAmount = this.totalMoney;
		}

		// Keep taking away chips
		while (betAmount > 0) {

			while (betAmount >= 500) {
				betAmount -= 500;
				this.purpleChips.pop();
			}

			while (betAmount >= 100) {
				betAmount -= 100;

				// If there's no more red chips ($100)
				if (this.redChips.length === 0) {

					// Pop a purple chip (-$500)
					this.purpleChips.pop();

					// Give back 4 red chips (+$400)
					this.redChips.push(4);
				} else {

					// Pop a red chip (-$100)
					this.redChips.pop();
				}
			}

			while (betAmount >= 50) {
				betAmount -= 50;

				// If there's no more blue chips ($50)
				if (this.blueChips.length === 0) {

					// and there's no more red chips ($100)
					if (this.redChips.length === 0) {

						// Pop a purple chip (-$500)
						this.purpleChips.pop();

						// Give back 4 red chips (+$400)
						for (let i = 0; i < 4; i++) {
							this.redChips.push(1);
						}

						// And 1 blue chip (+$50)
						this.blueChips.push(1);
					} else {

						// Pop a red chip (-$100)
						this.redChips.pop();

						// Give back 1 blue chip (+$50)
						this.blueChips.push(1);
					}
				} else {

					// Pop a blue chip (-$50)
					this.blueChips.pop();
				}
			}

			while (betAmount >= 25) {
				betAmount -= 25;

				// If there's no more green chips ($25)
				if (this.greenChips.length === 0) {

					// And theres no more blue chips ($50)
					if (this.blueChips.length === 0) {

						// And there's no more red chips ($100)
						if (this.redChips.length === 0) {

							// Pop a purple chip (-$500)
							this.purpleChips.pop();

							// Give them 4 red chips back (+$400)
							for (let i = 0; i < 4; i++) {
								this.redChips.push(1);
							}

							// 1 blue chip (+$50)
							this.blueChips.push(1);

							// And 1 green chip (+$25) ($475 back total)
							this.greenChips.push(1);

						} else {

							// Pop a red chip (-$100)
							this.redChips.pop();

							// Give back 3 greens (+$75)
							for (let i = 0; i < 3; i++) {
								this.greenChips.push(1);
							}
						}
					} else {

						// Pop a blue chip (-$50)
						this.blueChips.pop();

						// Give back 1 green (+$25)
						this.greenChips.push(1);
					}
				} else {

					// Take their money (-$25)
					this.greenChips.pop();
				}
			}
		}
	}
}
