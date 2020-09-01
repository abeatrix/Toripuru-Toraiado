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
	  this.handsChoice = null;
      this.boardChoice = null; //position on board
      this.score = 0;
	  this.deck = [];
	  this.choice = null;
	  this.gameBoardChoice = null;
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
			//console.log(`${this.deck[0].name} has been added to ${this.name} hands!`);
		};
		for(let i in this.hands){
			$(`#${this.name}Card${i} #topNum`).text(`${this.hands[i].top}`);
			$(`#${this.name}Card${i} #leftNum`).text(`${this.hands[i].left}`);
			$(`#${this.name}Card${i} #botNum`).text(`${this.hands[i].bottom}`);
			$(`#${this.name}Card${i} #rightNum`).text(`${this.hands[i].right}`);
		};
	}

	playaCard(){ //change color on board when player placed card
		let i = this.handsChoice; // where user click from hands
		let y = parseInt(this.boardChoice);
		this.boardChoice = y;
		let z = this.hands[i];
		$(`#cardBoard${y}`).addClass(`${this.name}Card`);
		$(`#cardBoard${y} #topNum`).text(`${z.top}`);
		$(`#cardBoard${y} #leftNum`).text(`${z.left}`);
		$(`#cardBoard${y} #botNum`).text(`${z.bottom}`);
		$(`#cardBoard${y} #rightNum`).text(`${z.right}`);
		for(let i in gameBoard){ // remove option from gameBoard
			if(gameBoard[i]==y){
				gameBoard.splice(i,1);
				this.choice = i;
			}
		}
		$(`#PlayerCard${i}`).remove(); // remove card from Hands in front end
		this.compareCards();
		player2.aiPicks();
	}


	aiPicks(){ // Card pick by CPU
		//let x = parseInt(player1.boardChoice)+1; // need to find its position on gameboard
		let x = gameBoard[Math.floor(Math.random() *gameBoard.length)];
		this.boardChoice = x;
		const aiRandom = Math.floor(Math.random() *this.hands.length);
		this.handsChoice = this.hands[aiRandom].name;
		$(`#CPUCard${aiRandom}`).remove();
		$(`#cardBoard${x}`).addClass(`${this.name}Card`);
		$(`#cardBoard${x} #topNum`).text(`${this.hands[aiRandom].top}`);
		$(`#cardBoard${x} #leftNum`).text(`${this.hands[aiRandom].left}`);
		$(`#cardBoard${x} #botNum`).text(`${this.hands[aiRandom].bottom}`);
		$(`#cardBoard${x} #rightNum`).text(`${this.hands[aiRandom].right}`);
		$(`#cardBoard${x}`).unbind();
		for(let i in gameBoard){
			if(gameBoard[i]==x){
				gameBoard.splice(i,1);
			}
		}
		this.hands.splice(aiRandom,1);
		this.compareCards();
		player1.handsChoice = null;
		player2.handsChoice = null;
	}

	compareCards(){ //compare cards
		//if($(`#cardBoard${y} #topNum`).text() > 2){
		let p1 = player1.boardChoice;
		let p2 = player2.boardChoice;
		if(p1 != null && p2 != null){
			if(p1 == p2+3){ // see if p1 card is on top of p2 card
				if($(`#cardBoard${p1} #topNum`).text() > $(`#cardBoard${p2} #botNum`).text()){
					player1.score += 1;
					$(`#cardBoard${p2}`).removeClass(`CPUCard`);
					$(`#cardBoard${p2}`).addClass(`PlayerCard`);
				} else {
					player2.score += 1;
					$(`#cardBoard${p1}`).removeClass(`PlayerCard`);
					$(`#cardBoard${p1}`).addClass(`CPUCard`);
				}
			} else if (p1 == p2-3){ // see if p1 card is below of p2 card
				if($(`#cardBoard${p1} #botNum`).text() > $(`#cardBoard${p2} #topNum`).text()){
					player1.score += 1;
					$(`#cardBoard${p2}`).removeClass(`CPUCard`);
					$(`#cardBoard${p2}`).addClass(`PlayerCard`);
				} else {
					player2.score += 1;
					$(`#cardBoard${p1}`).removeClass(`PlayerCard`)
					$(`#cardBoard${p1}`).addClass(`CPUCard`);
				}
			} else if (p1 == p2+1){// see if p1 card is one the right of p2 card
				if($(`#cardBoard${p1} #leftNum`).text() > $(`#cardBoard${p2} #rightNum`).text()){
					player1.score += 1;
					$(`#cardBoard${p2}`).removeClass(`CPUCard`)
					$(`#cardBoard${p2}`).addClass(`PlayerCard`);
				} else {
					player2.score += 1;
					$(`#cardBoard${p1}`).removeClass(`PlayerCard`)
					$(`#cardBoard${p1}`).addClass(`CPUCard`);
				}
			} else if (p1 == p2-1){// see if p1 card is on the left of p2 card
				if($(`#cardBoard${p1} #rightNum`).text() > $(`#cardBoard${p2} #leftNum`).text()){
					player1.score += 1;
					$(`#cardBoard${p2}`).removeClass(`CPUCard`)
					$(`#cardBoard${p2}`).addClass(`PlayerCard`);
				} else {
					player2.score += 1;
					$(`#cardBoard${p1}`).removeClass(`PlayerCard`)
					$(`#cardBoard${p1}`).addClass(`CPUCard`);
				}
			}
		}
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
    }

    gameStart(){
		console.log(`Welcome ${player1.name} and ${player2.name}!!`);
		player1.drawCard();
		player2.drawCard();
		this.clickBoardRegister();
		// while(gameBoard.length>0){
		// 	this.clickBoardRegister();
		// 	this.clickHandsRegister();
		// }
		//this.gameOver();
	}

	clickBoardRegister(){ // create cilck function for every tite on board
		for(let i in gameBoard){
			$(`.gameBoard #cardBoard${i}`).on("click", function(){
				player1.boardChoice = i;
				console.log(`Player picked card to place in ${player1.boardChoice}`)
				$(`.gameBoard #cardBoard${i}`).unbind();
				//this.clickHandsRegister();
				for(let i in player1.hands){
					$(`.playerHands #PlayerCard${i}`).on("click", function(){
						player1.handsChoice = i;
						// console.log(`Player picked card to place in ${player1.boardChoice}`)
						// console.log(`Player picked card ${player1.handsChoice} from hands`)
						player1.playaCard()
					})
				}
			})
		}
	}

	// clickHandsRegister(){ // create cilck function for every card on hands
	// 	for(let i in player1.hands){
	// 		$(`.playerHands #PlayerCard${i}`).on("click", function(){
	// 			player1.handsChoice = i;
	// 			// console.log(`Player picked card to place in ${player1.boardChoice}`)
	// 			// console.log(`Player picked card ${player1.handsChoice} from hands`)
	// 			player1.playaCard()
	// 		})
	// 	}
	// }

	gameOver(){
		if(player1.score>player2.score){
			alert(`Player won!`)
		} else if (player1.score == player2.score){
			alert(`it was a tie!`)
		} else {
			alert(`CPU won!`)
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


$("#reset").on("click", function(){
    console.log(`reset`);
});


