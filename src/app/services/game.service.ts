import { Injectable } from '@angular/core';
import { CardList } from '../classes/CardList';
import { Card } from '../classes/Card';
import { Chips } from '../classes/MoneyChips';

@Injectable()
export class GameService {

	private theDeck: CardList = null;
	private playerHand: CardList = null;
	private dealerHand: CardList = null;

	public playerScore: number;
	public dealerScore: number;
	public playerBet: number;
	public chips: Chips;
	public purpChips: number[];
	public redChips: number[];
	public blueChips: number[];
	public greenChips: number[];
	public playerMoney: number;

	private deckSize = 52;

	public playing = false;

	public playerWins: number;
	public playerLosses: number;

	constructor() {
		this.theDeck = new CardList(this.deckSize);
		this.theDeck.shuffle();
		this.dealerHand = null;
		this.playerHand = null;
		this.chips = new Chips();
		this.updateChips();
		this.playerBet = 0;
		this.playerMoney = this.chips.calculateMoney();
		this.playerLosses = 0;
		this.playerWins = 0;
	}

	public getTheDeck(): CardList { return this.theDeck; }

	public getPlayerHand(): CardList { return this.playerHand; }

	public getDealerHand(): CardList { return this.dealerHand; }

	public getPlayerScore(): number { return this.playerScore; }

	public getDealerScore(): number {
		if (this.playing === true) {
			let score = this.dealerHand.firstCard.getCardRank();
			if (score === 'A') {
				score = 11;
			}
			if (score === 'K' || score === 'Q' || score === 'J') {
				score = 10;
			}
			return score;
		} else {
			return this.dealerScore;
		}
	}


	public shuffleDeck(): void { this.theDeck.shuffle(); }

	public newGame(): void {
		this.dealerHand = null;
		this.playerHand = null;
		this.playerScore = 0;
		this.playing = true;
		this.dealerScore = 0;
		this.dealerHand = new CardList(0);
		this.playerHand = new CardList(0);
		if (this.theDeck.isEmpty()) {
			this.theDeck = new CardList(this.deckSize);
			this.shuffleDeck();
		}
		this.startGame();
	}

	private startGame(): void {
		while (this.dealerHand.getNumCards() < 2) {
			const firstCard = this.theDeck.deleteCard(0);
			this.playerHand.insertCard(firstCard);
			this.playerScore += this.calculatePlayerScore(firstCard);
			const dealerCard = this.theDeck.deleteCard(0);
			this.dealerHand.insertCard(dealerCard);
			this.dealerScore += this.calculateDealerScore(dealerCard);
		}
	}

	public toDealerHand(): void {
		if (this.theDeck.isEmpty()) {
			this.theDeck = new CardList(this.deckSize);
			this.shuffleDeck();
		}
		const card = this.theDeck.deleteCard(0);
		this.dealerHand.insertCard(card);
		this.dealerScore += this.calculateDealerScore(card);
	}

	public toPlayerHand(): void {
		if (this.theDeck.isEmpty()) {
			this.theDeck = new CardList(this.deckSize);
			this.shuffleDeck();
		}
		const card = this.theDeck.deleteCard(0);
		this.playerHand.insertCard(card);
		this.playerScore += this.calculatePlayerScore(card);
	}

	public stand(): void {
		if (this.dealerScore < 16) {
			this.toDealerHand();
			this.stand();
		}
	}

	public loseGame(): void {
		this.playing = false;
		this.chips.loseBet(this.playerBet);
		this.updateChips();
		this.playerMoney = this.chips.calculateMoney();
	}

	public tieGame(): void {
		this.playing = false;
	}

	public winGame(): void {
		this.playing = false;
		this.chips.winBet(this.playerBet);
		this.updateChips();
		this.playerMoney = this.chips.calculateMoney();
	}

	public setPlayerBet(bet: number) {
		this.playerBet = bet;
	}

	public calculateDealerScore(card: Card): number {
		let toBeAdded = card.getCardRank();

		if (toBeAdded === 'A') {
			if (this.dealerScore >= 11) {
				toBeAdded = 1;
			} else {
				toBeAdded = 11;
			}
		}

		if (toBeAdded === 'J' || toBeAdded === 'Q' || toBeAdded === 'K') {
			toBeAdded = 10;
		}

		return toBeAdded;
	}

	public calculatePlayerScore(card: Card): number {
		let toBeAdded = card.getCardRank();

		if (toBeAdded === 'A') {
			if (this.playerScore >= 11) {
				toBeAdded = 1;
			} else {
				toBeAdded = 11;
			}
		}

		if (toBeAdded === 'J' || toBeAdded === 'Q' || toBeAdded === 'K') {
			toBeAdded = 10;
		}

		return toBeAdded;
	}

	private updateChips(): void {
		this.purpChips = this.chips.purpleChips;
		this.redChips = this.chips.redChips;
		this.blueChips = this.chips.blueChips;
		this.greenChips = this.chips.greenChips;
	}

}
