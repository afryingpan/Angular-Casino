import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgClass, NgSwitch } from '@angular/common';
import { CardList } from '../../classes/CardList';
import { Card } from '../../classes/Card';
import { GameService } from '../../services/game.service';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Chips } from '../../classes/MoneyChips';

@Component({
	selector: 'app-game-table',
	templateUrl: './game-table.component.html',
	styleUrls: [
		'./game-table.component.css',
		'./cards.css',
		'./chips.css',
		'./animate.css',
		'./hover.css'
	]
})
export class GameTableComponent {

	theDeck: Card[];
	playerHand: Card[];
	dealerHand: Card[];

	private betEmphasis = 'hvr-grow-shadow animated swing';
	private nextEmphasis = 'hvr-grow-shadow animated infinite bounce';

	betSet = false;

	public options = {
		position: ['top', 'right'],
		timeOut: 2500,
	};

	constructor(public game: GameService, private notifications: NotificationsService) {
		this.theDeck = this.listToArray(this.game.getTheDeck());
	}

	public nextGame(): void {

		// if their bet isn't set make them set it
		if (this.betSet === false || this.game.playerBet === 0) {
			if (this.betEmphasis === 'hvr-grow-shadow animated shake') {
				this.betEmphasis = 'hvr-grow-shadow animated rubberBand';
				return;
			}
			this.betEmphasis = 'hvr-grow-shadow animated shake';
			return;
		}

		// Clear variables for next game
		this.playerHand = null;
		this.dealerHand = null;
		this.theDeck = null;

		this.game.newGame();
		this.theDeck = this.listToArray(this.game.getTheDeck());
		this.dealerHand = this.listToArray(this.game.getDealerHand());
		this.playerHand = this.listToArray(this.game.getPlayerHand());
		if (this.game.dealerScore === 21 && this.game.playerScore === 21) {
			this.tieGame();
		}
		if (this.game.dealerScore === 21) {
			this.loseGame('The dealer has 21!');
		}
		if (this.game.playerScore === 21) {
			this.winGame('Winner winner! 21');
		}
	}

	public getNextEmphasis(): string {
		if (this.game.playing === false) {
			return this.nextEmphasis;
		} else {
			return 'hvr-grow-shadow';
		}
	}

	public getBetEmphasis(): string {
		if (!this.game.playing || !this.game.playing) {
			return this.betEmphasis;
		} else {
			return 'hvr-grow-shadow';
		}
	}

	public setBet(): void {
		this.betSet = true;
		this.game.setPlayerBet(25);
	}

	public toPlayerHand(): void {

		if (this.game.playing) {

			// Send a card to player list
			this.game.toPlayerHand();

			// Make sure the player didn't lose
			if (this.game.playerScore > 21) {
				this.loseGame('Bust! You went over 21!');
			}

			// Update cards
			this.theDeck = this.listToArray(this.game.getTheDeck());
			this.playerHand = this.listToArray(this.game.getPlayerHand());
		}
		return;
	}

	public stand(): void {
		if (this.game.playing) {
			this.game.stand();
			this.theDeck = this.listToArray(this.game.getTheDeck());
			this.dealerHand = this.listToArray(this.game.getDealerHand());
			if (this.game.playerScore > this.game.dealerScore) {
				if (this.game.dealerScore > 21) {
					this.winGame('Dealer busts! You win!');
					return;
				}
				this.winGame('Congratulations! You beat the dealer');
				return;
			}
			if (this.game.dealerScore > this.game.playerScore) {
				if (this.game.dealerScore > 21) {
					this.winGame('Dealer busts! You win!');
					return;
				}
				this.loseGame('Sorry! The dealer beat you!');
				return;
			}
			if (this.game.dealerScore === this.game.playerScore) {
				this.tieGame();
				return;
			}
		}
	}

	/****************** HELPER METHODS ******************/

	private listToArray(deck: CardList) {
		let current = deck.getFirstCard();
		const temp = [current];
		current = current.getNextCard();
		while (current != null) {
			temp.push(current);
			current = current.getNextCard();
		}
		return temp;
	}

	private loseGame(msg: string): void {
		this.notifications.error('You lose!', msg);
		this.game.loseGame();
		this.betEmphasis = 'hvr-grow-shadow animated infinite pulse';
		return;
	}

	private tieGame(): void {
		this.notifications.info('Push!', 'You and the dealer tied!');
		this.game.tieGame();
		this.betEmphasis = 'hvr-grow-shadow animated infinite pulse';
		return;
	}

	private winGame(msg: string): void {
		this.notifications.success('You win!', msg);
		this.game.winGame();
		this.betEmphasis = 'hvr-grow-shadow animated infinite pulse';
		return;
	}


}
