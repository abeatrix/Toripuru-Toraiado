//Cards
var allCards= [
	{	name: 'Card 1',
		top: 3,
		right: 3,
		bottom: 2,
		left: 1,
		img: '',
	},
	{	name: 'Card 2',
		top: 1,
		right: 5,
		bottom: 1,
		left: 4,
		img: '',
	},
	{	name: 'Card 3',
		top: 4,
		right: 1,
		bottom: 6,
		left: 2,
		img: '',
	},
	{	name: 'Card 4',
		top: 4,
		right: 2,
		bottom: 3,
		left: 3,
		img: '',
	},
	{	name: 'Card 5',
		top: 2,
		right: 1,
		bottom: 2,
		left: 6,
		img: '',
	},
	{	name: 'Card 6',
		top: 3,
		right: 5,
		bottom: 2,
		left: 6,
		img: '',
	},
	{	name: 'Card 7',
		top: 5,
		right: 1,
		bottom: 1,
		left: 3,
		img: '',
	},
	{	name: 'Card 8',
		top: 2,
		right: 1,
		bottom: 4,
		left: 4,
		img: '',
	},
	{	name: 'Card 9',
		top: 1,
		right: 4,
		bottom: 1,
		left: 5,
		img: '',
	},
	{	name: 'Card 10',
		top: 1,
		right: 5,
		bottom: 4,
		left: 1,
		img: '',
	},
	{	name: 'Card 11',
		top: 6,
		right: 1,
		bottom: 1,
		left: 2,
		img: '',
    },
    {	name: 'Card 12',
        top: 1,
        right: 4,
        bottom: 1,
		left: 8,
		img: '',
    },
    {	name: 'Card 13',
        top: 2,
        right: 8,
        bottom: 1,
		left: 2,
		img: '',
    },
];

// Game Board Position
let gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// Classes //
class Card {
    constructor(name, top, right, bottom, left, img){
        this.name = name;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
        this.img = img;
    }

}

class Player {
    constructor(name){
      this.name = name;
	  this.hands = [];
	  this.handsChoice = 9;
      this.boardChoice = 9; //position on board
      this.score = 0;
	  this.deck = [];
	  this.choice = 0;
    }

    generateDeck(){
        allCards.forEach((playcard) => {
        const card = new Card(playcard.name, playcard.top, playcard.right, playcard.bottom, playcard.left, playcard.img);
        this.deck.push(card); // add to deck
		});
		this.deck.sort(() => Math.random() - 0.5); //shuffle deck
	}

	drawCard() { // draw card when hand is below 3
		while(this.hands.length < 5){
			this.hands.push(this.deck[0]);
			this.deck.splice(0,1);
			console.log(`${this.deck[0].name} has been added to ${this.name} hands!`);
		};
		for(let i in this.hands){
			$(`#${this.name}Card${i} #topNum`).text(`${this.hands[i].top}`);
			$(`#${this.name}Card${i} #leftNum`).text(`${this.hands[i].left}`);
			$(`#${this.name}Card${i} #botNum`).text(`${this.hands[i].bottom}`);
			$(`#${this.name}Card${i} #rightNum`).text(`${this.hands[i].right}`);
		};
	}

	playaCard(){ //change color on board when player placed card
		if(this.hands.length>1){
			let i = this.handsChoice; // where user click from hands
			let y = parseInt(this.boardChoice);
			let z = this.hands[i];
			$(`#cardBoard${y}`).addClass(`${this.name}Card`);
			console.log(`${this.name}Card`)
			$(`#cardBoard${y} #topNum`).text(`${z.top}`);
			$(`#cardBoard${y} #leftNum`).text(`${z.left}`);
			$(`#cardBoard${y} #botNum`).text(`${z.bottom}`);
			$(`#cardBoard${y} #rightNum`).text(`${z.right}`);
			for(let i in gameBoard){
				if(gameBoard[i]==y){
					gameBoard.splice(i,1);
					this.choice = i;
				}
			}
			console.log(gameBoard)
			$(`#PlayerCard${i}`).remove();
			player2.aiPicks();
		} game.gameOver();
	}

	aiPicks(){ // Card pick by CPU
		let x = parseInt(player1.boardChoice)+1; // need to find its position on gameboard
		const aiRandom = Math.floor(Math.random() *5);
		console.log(`AI picked ${this.hands[aiRandom]} to place in ${x}`);
		this.handsChoice = this.hands[aiRandom];
		$(`#cardBoard${x}`).addClass(`${this.name}Card`);
		//$(`#cardBoard${x}`).addClass(`PlayedonBoard`);
		$(`#cardBoard${x} #topNum`).text(`${this.hands[aiRandom].top}`);
		$(`#cardBoard${x} #leftNum`).text(`${this.hands[aiRandom].left}`);
		$(`#cardBoard${x} #botNum`).text(`${this.hands[aiRandom].bottom}`);
		$(`#cardBoard${x} #rightNum`).text(`${this.hands[aiRandom].right}`);
		for(let i in gameBoard){
			if(gameBoard[i]==x){
				gameBoard.splice(i,1);
				this.choice = i;
			}
		}
		$(`.gameBoard #cardBoard${this.choice}`).unbind();
		console.log(gameBoard);
		$(`#CPUCard${aiRandom}`).remove();
	}

	cardCapture(){
		//(?????).addClass(`${this.name}Card`);
	}

}

class Game {
    constructor(player1, player2) {
      this.round = 1;                     // round counter
      this.player1 = player1;             // player 1 register
      this.player2 = player2;            // player 2 register
      this.cardsOnBoard = [];
    }

    gameStart(){
		console.log(`Welcome ${player1.name} and ${player2.name}!!`);
		player1.drawCard();
		player2.drawCard();
		this.clickBoardRegister();
		this.clickHandsRegister();
	}

	compareCards(redCard, blueCard){
		if(redCard>blueCard){
			player1.cardCapture();
		} else if(redCard === blueCard){
			console.log(`it's a tie`)
		} else {
			player2.cardCapture();
		}
	}

	clickBoardRegister(){ // create cilck function for every tite on board
		for(let i in gameBoard){
			$(`.gameBoard #cardBoard${i}`).on("click", function(){
				player1.boardChoice = i;
				console.log(`Player picked card to place in ${player1.boardChoice}`)
				$(`.gameBoard #cardBoard${i}`).unbind();
			})
		}
	}

	clickHandsRegister(){ // create cilck function for every card on hands
		for(let i in player1.hands){
			$(`.playerHands #PlayerCard${i}`).on("click", function(){
				player1.handsChoice = i;
				console.log(`Player picked card to place in ${player1.boardChoice}`)
				console.log(`Player picked card ${player1.handsChoice} from hands`)
				player1.playaCard()
			})
		}
	}

	gameOver(){
		if(gameBoard.length ===0){
			if(player1.score>player2.score){
				alert(`Player won!`)
			} else if (player1.score === player2.score){
				alert(`it was a tie!`)
			} else {
				alert(`CPU won!`)
			}
		}
	}



}

// Global Variables //
const player1 = new Player('Player');
player1.generateDeck();
const player2 = new Player('CPU');
player2.generateDeck();

$("#startbutton").on("click", function(){
  console.log(`===Game Start===`);
  let game = new Game('player1', 'player2');
  game.gameStart();
});


$("#testing").on("click", function(){
    console.log(`testing`);
});


