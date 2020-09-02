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
	  this.deck = [];
	  this.hands = [];
	  this.handsChoice = null;																		// the card from hand that the player has CLICKED
      this.boardChoice = null; 																		// the position on board that the player has CLICKED
	  this.choice = null; 																			// the index of the card that the player currently selected
	  this.onBoard = []; 																			// player's cards' positions on board
	  this.readyCheck = 0; 																			// ready check
	  this.compareCheck = 0;																		// check if the cards have been compared this round

    }

    generateDeck(){
        allCards.forEach((playcard) => {
        const card = new Card(playcard.name, playcard.top, playcard.right, playcard.bottom, playcard.left, playcard.img);
        this.deck.push(card); 																	// add newly created cards to deck
		});
		this.deck.sort(() => Math.random() - 0.5); 												//shuffle deck before players draw from them to make sure that they will always be different
	}

	drawCard() { 																					// draw card until cards in hands reach 5
		while(this.hands.length < 5){
			this.hands.push(this.deck[0]);
			this.deck.splice(0,1);
			//console.log(`${this.deck[0].name} has been added to ${this.name} hands!`);
		};
		for(let i in this.hands){																// add cards to hands in front-end
			$(`#${this.name}Card${i} #topNum`).text(`${this.hands[i].top}`);
			$(`#${this.name}Card${i} #leftNum`).text(`${this.hands[i].left}`);
			$(`#${this.name}Card${i} #botNum`).text(`${this.hands[i].bottom}`);
			$(`#${this.name}Card${i} #rightNum`).text(`${this.hands[i].right}`);
		};
	}

	playaCard(){ 																					// When user click on the board then card in hard, the card will show up on their board, and remove it from their hands
		console.log(`Player play Card Check Point 1`);
		if(this.readyCheck == 0 && this.compareCheck == 0){
			console.log(`Player play Card Check Point 2`);
			console.log(player1.handsChoice);
			console.log(`click board choice check 2 - ${player1.boardChoice}`);
			if(this.handsChoice != null){
				let i = parseInt(this.handsChoice); 															// where user click from hands
				let y = parseInt(this.boardChoice); 												// the position of the board the user selected
				this.boardChoice = y;																// add the user choice to the variable boardChoice for compareCard function
				let z = this.hands[i]; 																// this is the card that the player picked from their hands
				console.log(`Player play Card Check Point 3`);
				console.log(z);
				$(`#cardBoard${y}`).addClass(`${this.name}Card`);
				$(`#cardBoard${y} #topNum`).text(`${z.top}`);
				$(`#cardBoard${y} #leftNum`).text(`${z.left}`);
				$(`#cardBoard${y} #botNum`).text(`${z.bottom}`);
				$(`#cardBoard${y} #rightNum`).text(`${z.right}`);
				$(`#cardBoard${y}`).unbind();														// make selected tile not clickable anymore
				if(this.boardChoice!=null){
					for(let i in gameBoard){														// to locate where the card player placed in gameBoard
						if(gameBoard[i]==y){
							gameBoard.splice(i,1);													// remove position from gameBoard
							this.choice = i; 														// the index of the card that the player currently selected
							console.log(`playaCard check point 4`)
						}
					}
					console.log(`checking pushing problem`);
					this.onBoard.push(this.boardChoice); 												// add card to the array that store what cards players have on board
					$(`#PlayerCard${i}`).remove(); 													// remove card from Hands in front-end
				}
				if($(`#cardBoard${y} #rightNum`).text() > 0 & this.choice != null){
					this.compareCardsPlayer();
					console.log(`playaCard check point 5`)
					if(this.compareCheck == 1){
						this.readyCheck = 1;
						console.log(`playaCard check point 6`)
					}
				}
			}
		}
		player2.aiPicks();
	}

	compareCardsPlayer(){ 																									//compare cards at player's turn + capture cards
		let x = this.boardChoice;
		console.log(`click board choice check in compare 1 ${player1.boardChoice}`);
		let p1 = player1.onBoard;
		let p2 = player2.onBoard;
		let p1Temp = [];
		console.log(`compare check point 1`);
		if($(`#cardBoard${x} #topNum`).text() > 0 && this.compareCheck == 0){
			if(p1.length >0 && p2.length >0){
				for(let j in p2){
					if(x == (parseInt(p2[j])+3) ){ 																			// see if current picked card is on top of p2 card
						if($(`#cardBoard${x} #topNum`).text() > $(`#cardBoard${parseInt(p2[j])} #botNum`).text()){
							$(`#cardBoard${parseInt(p2[j])}`).removeClass(`CPUCard`);
							$(`#cardBoard${parseInt(p2[j])}`).addClass(`PlayerCard`);
							p1Temp.push(p2[j]);
							p2.splice(j,1);
							console.log(`does this work 1`);
							this.compareCheck = 1;
						} else {
							this.compareCheck = 1;
							console.log(`there is no match`);
						}
					} else if(x == (parseInt(p2[j])-3)){ 														// see if p1 card is below of p2 card
						if($(`#cardBoard${x} #botNum`).text() > $(`#cardBoard${parseInt(p2[j])} #topNum`).text()){
							$(`#cardBoard${parseInt(p2[j])}`).removeClass(`CPUCard`);
							$(`#cardBoard${parseInt(p2[j])}`).addClass(`PlayerCard`);
							p1Temp.push(p2[j]);
							p2.splice(j,1);
							this.compareCheck = 1;
							console.log(`does this work 2`);
						} else {
							this.compareCheck = 1;
							console.log(`there is no match`);
						}
					} else if(x == (parseInt(p2[j])+1) && (x % 3 !=0)){							// see if p1 card is one the right of p2 card
						if($(`#cardBoard${x} #leftNum`).text() > $(`#cardBoard${parseInt(p2[j])} #rightNum`).text()){
							$(`#cardBoard${parseInt(p2[j])}`).removeClass(`CPUCard`)
							$(`#cardBoard${parseInt(p2[j])}`).addClass(`PlayerCard`);
							p1Temp.push(p2[j]);
							p2.splice(j,1);
							this.compareCheck = 1;
							console.log(`does this work 3`);
						} else {
							this.compareCheck = 1;
							console.log(`there is no match`);
						}
					} else if(x == parseInt(p2[j]-1) && (x % 3 !=2)){										// see if p1 card is on the left of p2 card
						if($(`#cardBoard${x} #rightNum`).text() > $(`#cardBoard${parseInt(p2[j])} #leftNum`).text()){
							$(`#cardBoard${parseInt(p2[j])}`).removeClass(`CPUCard`)
							$(`#cardBoard${parseInt(p2[j])}`).addClass(`PlayerCard`);
							p1Temp.push(p2[j]);
							p2.splice(j,1);
							this.compareCheck = 1;
							console.log(`does this work 4`);
						} else {
							this.compareCheck = 1;
							console.log(`there is no match`);
						}
					} else {
						this.compareCheck = 1;
						console.log(`there is no match`);
					}
				}
			}
			else if (p1.length >0 && p2.length ==0) {
				this.compareCheck = 1;
				console.log(`compare check point 2`)
			} else {
				this.compareCheck = 1;
				console.log(`does this work 5`)
			}
		}
		if(this.compareCheck == 1){
			if(p1Temp.length > 0){ 																								// add whats in the temporary array to the actual one after cards capturing has been completed.
				player1.onBoard.push(p1Temp[0]);
				console.log(`compare check onboad Push check`)
				console.log(p1Temp[0])
				console.log(p1)
				console.log(p1Temp)
				console.log(`compare check point 3`)
			}
			p1Temp = [];
		}
		console.log(`compare check point 4`);
	}


	aiPicks(){ 																						// Function to let CPU pick a card randomly, and place it on the board randomly
		console.log(`AICard check point 1`)
		if(player1.readyCheck == 1 && player1.compareCheck == 1){
			let x = gameBoard[Math.floor(Math.random() *gameBoard.length)]; 						// computer randomly find a position on gameboard to place their cards
			console.log(`AI picked ${x} to play on board ==========`)
			this.boardChoice = x; 																	// add the CPU choice to the variable boardChoice for compareCard function
			const aiRandom = Math.floor(Math.random() *this.hands.length);
			this.handsChoice = this.hands[aiRandom].name;
			console.log(`AICard check point 2`)
			$(`#CPUCard${aiRandom}`).remove();													// remove card from hands in front-end
			$(`#cardBoard${x}`).addClass(`${this.name}Card`);									// add selected card from hands to board
			$(`#cardBoard${x} #topNum`).text(`${this.hands[aiRandom].top}`);
			$(`#cardBoard${x} #leftNum`).text(`${this.hands[aiRandom].left}`);
			$(`#cardBoard${x} #botNum`).text(`${this.hands[aiRandom].bottom}`);
			$(`#cardBoard${x} #rightNum`).text(`${this.hands[aiRandom].right}`);
			$(`#cardBoard${x}`).unbind();															// make selected tile not clickable anymore
			this.onBoard.push(x); 																	// add card to the array that store what cards players have on board
			for(let i in gameBoard){
				if(gameBoard[i] == x){
					console.log(`AI found gameboard ${i} and x is ${x}`)
					gameBoard.splice(i,1);														// remove position from gameBoard
					this.hands.splice(aiRandom, 1);
					this.readyCheck = 1;
					console.log(`AICard check point 3`)
				}
			}
			if(player2.readyCheck == 1 && player1.readyCheck == 1){
				console.log(`AICard check point 4`)
				this.compareCardsAI();
				if(this.compareCheck == 1){
					this.resetRound();
					console.log(`AICard check point 5`)
				}
			}
		}
	}

	compareCardsAI(){ 																										//compare cards at AI's turn + capture cards
		let x = parseInt(this.boardChoice);
		let p1 = player1.onBoard;
		let p2 = player2.onBoard;
		let p2Temp = [];
		console.log(`AI Compare check point 1`)
		if($(`#cardBoard${x} #topNum`).text() > 0 && this.compareCheck == 0){
			if(p1.length >0 && p2.length >0){
				for(let j in p1){
					if(x == (parseInt(p1[j])+3)){ 																			// see if current picked card is on top of p2 card
						if($(`#cardBoard${x} #topNum`).text() > $(`#cardBoard${parseInt(p1[j])} #botNum`).text()){
							$(`#cardBoard${parseInt(p1[j])}`).removeClass(`PlayerCard`);
							$(`#cardBoard${parseInt(p1[j])}`).addClass(`CPUCard`);
							p2Temp.push(p1[j]);
							p1.splice(j,1);
							this.compareCheck = 1;
							console.log(`AI does this work 1`);
							console.log(`${p1[j]}`);
							console.log(j);
							console.log(p1);
						} else {
							this.compareCheck = 1;
							console.log(`there is no match`);
						}
					} else if(x == (parseInt(p1[j])-3)){ 														// see if p1 card is below of p2 card
						if($(`#cardBoard${x} #botNum`).text() > $(`#cardBoard${parseInt(p1[j])} #topNum`).text()){
							$(`#cardBoard${parseInt(p1[j])}`).removeClass(`PlayerCard`);
							$(`#cardBoard${parseInt(p1[j])}`).addClass(`CPUCard`);
							p2Temp.push(p1[j]);
							p1.splice(j,1);
							this.compareCheck = 1;
							console.log(`AI does this work 2`);
							console.log(`${p1[j]}`);
							console.log(j);
							console.log(p1);
						} else {
							this.compareCheck = 1;
							console.log(`there is no match`);
						}
					} else if(x == parseInt(p1[j]+1) && (x % 3 !=0)){											// see if p1 card is one the right of p2 card
						if($(`#cardBoard${x} #leftNum`).text() > $(`#cardBoard${parseInt(p1[j])} #rightNum`).text()){
							$(`#cardBoard${parseInt(p1[j])}`).removeClass(`PlayerCard`)
							$(`#cardBoard${parseInt(p1[j])}`).addClass(`CPUCard`);
							p2Temp.push(p1[j]);
							p1.splice(j,1);
							this.compareCheck = 1;
							console.log(`AI does this work 3`);
							console.log(`${p1[j]}`);
							console.log(j);
							console.log(p1);
						} else {
							this.compareCheck = 1;
							console.log(`there is no match`);
						}
					} else if(x == parseInt(p1[j]-1) && (x % 3 !=2)){											// see if p1 card is on the left of p2 card
						if($(`#cardBoard${x} #rightNum`).text() > $(`#cardBoard${parseInt(p1[j])} #leftNum`).text()){
							$(`#cardBoard${parseInt(p1[j])}`).removeClass(`PlayerCard`)
							$(`#cardBoard${parseInt(p1[j])}`).addClass(`CPUCard`);
							p2Temp.push(p1[j]);
							p1.splice(j,1);
							this.compareCheck = 1;
							console.log(`AI does this work 4`);
							console.log(`${p1[j]}`);
							console.log(j);
							console.log(p1);
						} else {
							this.compareCheck = 1;
							console.log(`there is no match`);
						}
					} else {
						console.log(`AI Compare check point 2`)
						this.compareCheck = 1;
					}
				}
			}
		}
		if(this.compareCheck == 1){
			if(p2Temp.length > 0){ 																								// add whats in the temporary array to the actual one after cards capturing has been completed.
				player2.onBoard.push(p2Temp[0]);
				console.log(`AI compare check onboad Push check`)
				console.log(p2Temp)
				console.log(`AI Compare check point 4`)
			}
			p2Temp = [];
			console.log(p2Temp)
		}
	}

	resetRound(){																											// reset all decisions made
		player1.handsChoice = null;
		player2.handsChoice = null;
		player1.boardChoice = null;
		player2.boardChoice = null;
		player1.readyCheck = 0;
		player2.readyCheck = 0;
		player1.compareCheck = 0;
		player2.compareCheck = 0;
	}

}

class Game {
    constructor(player1, player2) {
      this.player1 = player1;            																					// register player 1
	  this.player2 = player2;
	  this.totalBoard = 0;           																						// register player 2
    }

    // gameStart(){
	// 	console.log(`Welcome ${player1.name} and ${player2.name}!!`);
	// 	player1.drawCard();
	// 	player2.drawCard();
	// 	if(gameBoard.length > 0){
	// 		if(player1.handsChoice == null){
	// 			this.clickBoardRegister();
	// 			this.clickHandsRegister();
	// 		}
	// 		player1.playaCard();
	// 	}
	// 	if(gameBoard.length<=0){
	// 		this.gameOver();
	// 	}
	// }

	// gameStart(){
	// 	console.log(`Welcome ${player1.name} and ${player2.name}!!`);
	// 	player1.drawCard();
	// 	player2.drawCard();
	// 	if(gameBoard.length > 0){
	// 		this.clickBoardRegister();
	// 		this.clickHandsRegister();
	// 	}
	// 	else if(gameBoard.length = 0){
	// 		this.gameOver();
	// 		console.log(`gameStart check point 2`);
	// 	}
	// }

	gameStart(){
		console.log(`Welcome ${player1.name} and ${player2.name}!!`);
		player1.drawCard();
		player2.drawCard();
		if(gameBoard.length > 0){
			this.clickBoardRegister();
			this.clickHandsRegister();
		}
	}


	clickBoardRegister(){ 																									// create cilck listener for every tile on board
		for(let i in gameBoard){
			$(`.gameBoard #cardBoard${i}`).on("click", function(){
				player1.boardChoice = i;
				console.log(`click board choice ${player1.boardChoice}`);
				console.log(`Player picked card to place in ${player1.boardChoice}`)
				$(`.gameBoard #cardBoard${i}`).unbind();
			})
		}
	}

	clickHandsRegister(){ 																									// create cilck listener for every card in hands
		for(let i in player1.hands){
			$(`.playerHands #PlayerCard${i}`).on("click", function(){
				player1.handsChoice = i;
				console.log(`====================`);
				console.log(`Player picked card ${player1.handsChoice} from hands`)
				if(player1.handsChoice != null){
					console.log(`clickHandsRegister check point 1`);
					player1.playaCard();
				}
			})
		}
	}

	gameOver(){
		if(player1.onBoard.length>player2.onBoard.length){
			alert(`Player won!`)
		} else if (player1.onBoard.length == player2.onBoard.length){
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


// Buttons //
$("#startbutton").on("click", function(){
  console.log(`===Game Start===`);
  let game = new Game('player1', 'player2');
  game.gameStart();
  $("#startbutton").remove();
});


$("#reset").on("click", function(){
    console.log(`reset`);
});


