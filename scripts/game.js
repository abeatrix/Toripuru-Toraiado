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
	  this.hands = [];																											// cards the players start with
	  this.handsCounter = [];																									// keep track of the cards left in hands
	  this.handsChoice = null;																									// the card from hand that the player has CLICKED
      this.boardChoice = null; 																									// the position on board that the player has CLICKED
	  this.choice = null; 																										// the index of the card that the player currently selected
	  this.onBoard = []; 																										// player's cards' positions on board
	  this.readyCheck = 0; 																										// ready check
	  this.compareCheck = 0;																									// check if the cards have been compared this round
    }

    generateDeck(){
        allCards.forEach((playcard) => {
        const card = new Card(playcard.name, playcard.top, playcard.right, playcard.bottom, playcard.left, playcard.img);
		this.deck.push(card); 																									// add newly created cards to deck
		});
		this.deck.sort(() => Math.random() - 0.5); 																				//shuffle deck before players draw from them to make sure that they will always be different
	}

	drawCard() { 																												// draw card until cards in hands reach 5
		while(this.hands.length < 5){
			this.hands.push(this.deck[0]);
			this.deck.splice(0,1);
		};
		for(let i in this.hands){																								// add cards to hands in front-end
			$(`#${this.name}Card${i} #topNum`).text(`${this.hands[i].top}`);
			$(`#${this.name}Card${i} #leftNum`).text(`${this.hands[i].left}`);
			$(`#${this.name}Card${i} #botNum`).text(`${this.hands[i].bottom}`);
			$(`#${this.name}Card${i} #rightNum`).text(`${this.hands[i].right}`);
		};
	}

	playaCard(){ 																												// When user click on the board then card in hard, the card will show up on their board, and remove it from their hands
		if(this.readyCheck == 0 && this.compareCheck == 0){
			if(this.handsChoice != null ){
				let i = parseInt(this.handsChoice); 																			// where user click from hands
				let y = parseInt(this.boardChoice); 																			// the position of the board the user selected
				this.boardChoice = y;																							// add the user choice to the variable boardChoice for compareCard function
				let z = this.hands[i]; 																							// this is the card that the player picked from their hands
				$(`#cardBoard${y}`).addClass(`${this.name}Card`, 1000, `linear`)
				$(`#cardBoard${y} #topNum`).text(`${z.top}`);
				$(`#cardBoard${y} #leftNum`).text(`${z.left}`);
				$(`#cardBoard${y} #botNum`).text(`${z.bottom}`);
				$(`#cardBoard${y} #rightNum`).text(`${z.right}`);
				if(this.boardChoice!=null ){
					for(let i in gameBoard){																					// to locate where the card player placed in gameBoard
						if(gameBoard[i]==y & gameBoard.length !== 0){
							gameBoard.splice(i,1);																				// remove position from gameBoard
							this.choice = i; 																					// the index of the card that the player currently selected
							$(`#PlayerCard${parseInt(this.handsChoice)}`).remove(); 											// remove card from Hands in front-end
						}
					}
					console.log(`checking pushing problem`);
					if(typeof(this.boardChoice) != `NaN`){
						this.onBoard.push(this.boardChoice);
					}																											// add card to the array that store what cards players have on board
				}
				if($(`#cardBoard${y} #rightNum`).text() > 0 & this.choice != null){
					this.compareCards(player2);
					if(this.compareCheck == 1){
						this.readyCheck = 1;
						$(`#cardBoard${y}`).unbind();																			// make selected tile not clickable anymore
					}
				}
			}
			if(player2.hands.length === 5 && player2.handsCounter.length === 0){
				player2.handsCounter = player2.hands.slice();
			}
		} else if (gameBoard.length == 0){
			this.compareCards(player2);
			if(this.compareCheck == 1){
				this.gameOver();
				$(`#cardBoard${y}`).unbind();																					// make selected tile not clickable anymore
			}
		}
	}

	aiPicks(){ 																													// Function to let CPU pick a card randomly, and place it on the board randomly
		if(player1.readyCheck == 1 && player1.compareCheck == 1 && gameBoard.length!=0){
			let x = gameBoard[Math.floor(Math.random() *gameBoard.length)]; 													// computer randomly find a position on gameboard to place their cards
			this.boardChoice = x; 																								// add the CPU choice to the variable boardChoice for compareCard function
			const aiRandom = this.handsCounter[Math.floor(Math.random() *this.handsCounter.length)];							// computer randomly find a number for the index in hands to play
			for(let i in this.hands){
				if(this.hands[i].name === aiRandom.name){
					this.choice = i;
				}
			}
			for(let i in this.handsCounter){
				if(this.handsCounter[i].name === aiRandom.name){
					this.handsCounter.splice(i, 1);
				}
			}
			$(`#cardBoard${x}`).addClass(`${this.name}Card`, 1000, `linear`);																	// add selected card from hands to board
			$(`#cardBoard${x} #topNum`).text(`${aiRandom.top}`);
			$(`#cardBoard${x} #leftNum`).text(`${aiRandom.left}`);
			$(`#cardBoard${x} #botNum`).text(`${aiRandom.bottom}`);
			$(`#cardBoard${x} #rightNum`).text(`${aiRandom.right}`);
			$(`#cardBoard${x}`).unbind();																						// make selected tile not clickable anymore
			if(typeof(this.boardChoice) != `NaN`){																				// add card to the array that store what cards players have on board
				this.onBoard.push(this.boardChoice);
			}
			for(let i in gameBoard){
				if(gameBoard[i] == x){
					gameBoard.splice(i,1);																						// remove position from gameBoard
					this.readyCheck = 1;
				}
			}
			$(`#CPUCard${this.choice}`).remove();																				// remove card on front end
			if(player2.readyCheck == 1 && player1.readyCheck == 1){
				console.log(`AICard check point 8`)
				setTimeout(this.compareCards(player1), 1000);
				if(this.compareCheck == 1){
					this.resetRound();
					console.log(`AICard check point 9`)
					console.log(`player1.onBoard.length ${player1.onBoard.length}`)
					console.log(`player2.onBoard.length ${player2.onBoard.length}`)
				}
			}
		}
	}

	compareCards(target){ 																											//compare cards at AI's turn + capture cards
		let x = parseInt(this.boardChoice);
		let p1 = this.onBoard;
		let p2 = target.onBoard;
		let pTemp = [];
		let iTemp = [];
		if($(`#cardBoard${x} #topNum`).text() > 0 && this.compareCheck == 0){
			console.log(`check point 1_1`)
			if(p1.length >0 && p2.length >0){
				console.log(`check point 1_2`)
				for(let j in p2){
					let y = parseInt(p2[j]);
					console.log(`just checking`);
					console.log(`${this.name} is looping target array has ${target.onBoard}`);
					console.log(`${this.name} is looping ${target.name}'s on board-current on: ${y}`);
					if(y != `NaN` && x == (y+3)){ 																				               	 // see if current picked card is on top of p2 card
						if($(`#cardBoard${x} #topNum`).text() > $(`#cardBoard${y} #botNum`).text()){
							($(`#cardBoard${y}`).switchClass(`${target.name}Card`, `${this.name}Card`, 1000, `swing`)).effect("bounce");
							pTemp.push(p2[j]);
							iTemp.push(j);
							this.compareCheck = 1;
							console.log(`does this work 1`);
						} else {
							this.compareCheck = 1;
							console.log(`there is no match`);
						}
					} else if(y != `NaN` && x == (y-3)){ 																		          			 // see if p1 card is below of p2 card
						if($(`#cardBoard${x} #botNum`).text() > $(`#cardBoard${y} #topNum`).text()){
							($(`#cardBoard${y}`).switchClass(`${target.name}Card`, `${this.name}Card`, 1000, `swing`)).effect("bounce");
							pTemp.push(p2[j]);
							iTemp.push(j);
							this.compareCheck = 1;
							console.log(`does this work 2`);
						} else {
							this.compareCheck = 1;
							console.log(`there is no match`);
						}
					} else if(y != `NaN` && x == (y+1) && (x % 3 != 0)){																			// see if p1 card is one the right of p2 card
						if($(`#cardBoard${x} #leftNum`).text() > $(`#cardBoard${y} #rightNum`).text()){
							($(`#cardBoard${y}`).switchClass(`${target.name}Card`, `${this.name}Card`, 1000, `swing`)).effect("bounce");
							pTemp.push(p2[j]);
							iTemp.push(j);
							this.compareCheck = 1;
							console.log(`does this work 3`);
						} else {
							this.compareCheck = 1;
							console.log(`there is no match`);
						}
					} else if(y != `NaN` && x == (y-1) && (x % 3 != 2)){																			// see if p1 card is on the left of p2 card
						if($(`#cardBoard${x} #rightNum`).text() > $(`#cardBoard${y} #leftNum`).text()){
							($(`#cardBoard${y}`).switchClass(`${target.name}Card`, `${this.name}Card`, 1000, `swing`)).effect("bounce");
							pTemp.push(p2[j]);
							iTemp.push(j);
							this.compareCheck = 1;
							console.log(`does this work 4`);
						} else {
							this.compareCheck = 1;
							console.log(`there is no match`);
						}
					} else if( isNaN(y) == `true`) {
						console.log(p2[j]);
						console.log(`=============HOW DID IT GET HERE ===============`);
						iTemp.push(j);
					}else {
						console.log(`there is no match`);
						this.compareCheck = 1;
					}
				}
			}
			else if (p1.length >0 && p2.length ==0) {
				this.compareCheck = 1;
				console.log(`there is no match at beginning`);
			} else {
				this.compareCheck = 1;
				console.log(`does this work 5`)
			}
		}
		if(this.compareCheck == 1){
			console.log(`${pTemp.length} = pTemp Length`);
			if(pTemp.length > 0 && gameBoard.length >= 0){
				for(let i in pTemp){
					console.log(`${pTemp[i]}.currently adding to ${this.name}'s onBoard.length`);
					console.log(`${this.onBoard.length} is ${this.name}'s onBoard.length`);
					this.onBoard.push(pTemp[i]);																									// add whats in the temporary array to the actual one after cards capturing has been completed.
				}
				for(let i = iTemp.length -1 ; i >= 0; --i){
					console.log(`${iTemp.length} iTemp length`);
					p2.splice(parseInt(iTemp[i]),1)
					this.compareCheck = 1;
				}
			}
			pTemp = [];
			iTemp = [];
		}
	}

	resetRound(){																																	// reset all decisions made
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
      this.player1 = player1;            																											// register player 1
	  this.player2 = player2;																														// register player 2
    }

	gameStart(){
		console.log(`Welcome ${player1.name} and ${player2.name}!!`);
		this.makeMoreCards();
		player1.generateDeck();
		player1.drawCard();
		player2.generateDeck();
		player2.drawCard();
		if(gameBoard.length > 0){
			this.clickBoardRegister();
			this.clickHandsRegister();
		}
		if(gameBoard.length == 0){
			this.gameOver();
		}
	}


	clickBoardRegister(){ 																															// create cilck listener for every tile on board
		for(let i in gameBoard){
			if(gameBoard.length > 0){
				$(`.gameBoard #cardBoard${i}`).on("click", function(){
					player1.boardChoice = i;
				})
			}
		}
	}

	clickHandsRegister(){
		const gameEnds = this.gameOver;																												// create cilck listener for every card in hands
		for(let i in player1.hands){
			$(`.playerHands #PlayerCard${i}`).on("click", function(){
				player1.handsChoice = i;
				if(player1.handsChoice != null){
					player1.playaCard();
					setTimeout(function(){
						player2.aiPicks()
						if (gameBoard.length == 0){
							player1.compareCards(player2);
							gameEnds();
						}
					}, 500);
				}
				$(this).prop('disabled', true);
				setTimeout(function(){
					$(this).prop('disabled', false); }, 500);
			})
		}
	}

	makeMoreCards(){ 																																// generate more random cards
		let newCard = [];
		for(let i=0; i < 20; i++){
			newCard[i] = {
				name: 'Card' + i,
				top: Math.floor(Math.random()*8)+1,
				right: Math.floor(Math.random()*8)+1,
				bottom: Math.floor(Math.random()*8)+1,
				left: Math.floor(Math.random()*8)+1,
				img: '',
			}
			allCards.push(newCard[i]);
		}
	}

	gameOver(){
		if(player1.onBoard.length>player2.onBoard.length){
			swal(`Player won!`, `Player: ${player1.onBoard.length} CPU: ${player2.onBoard.length}`, `success`)
			$("#cpuHands, .playerHands").remove();
			$("aside").append(`<button id="reset">Reset</button>`);
		} else if (player1.onBoard.length == player2.onBoard.length){
			swal(`It was a tie!`, `Player: ${player1.onBoard.length} CPU: ${player2.onBoard.length}`, `info`)
			$("#cpuHands, .playerHands").remove();
			$("aside").append(`<button id="reset">Reset</button>`);
		} else {
			swal(`CPU won!`, `Player: ${player1.onBoard.length} CPU: ${player2.onBoard.length}`, `error`)
			$("#cpuHands, .playerHands").remove();
			$("aside").append(`<button id="reset">Reset</button>`);
		}
	}

}


// Global Variables //
const player1 = new Player('Player');
const player2 = new Player('CPU');


// Buttons //
$("aside").on("click", "button#reset", function(){
    location.reload();
});


$("#click2Start").on("click", function(){
	console.log(`===Game Start===`);
	let game = new Game('player1', 'player2');
	game.gameStart();
	$("#click2Start").remove();
	$(".placeHolder").remove();
});
