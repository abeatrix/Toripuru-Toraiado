playaCard(target){ 																												// When user click on the board then card in hard, the card will show up on their board, and remove it from their hands
	if(this.readyCheck == 0 && this.compareCheck == 0){
		if(this.handsChoice != null ){
			let i = parseInt(this.handsChoice); 																			// where user click from hands
			let y = parseInt(this.boardChoice); 																			// the position of the board the user selected
			this.boardChoice = y;																							// add the user choice to the variable boardChoice for compareCard function
			let z = this.hands[i]; 																							// this is the card that the player picked from their hands
			$(`#cardBoard${y}`).addClass(`${this.name}Card`, 500, `linear`);
			$(`#cardBoard${y} #topNum`).text(`${z.top}`);
			$(`#cardBoard${y} #leftNum`).text(`${z.left}`);
			$(`#cardBoard${y} #botNum`).text(`${z.bottom}`);
			$(`#cardBoard${y} #rightNum`).text(`${z.right}`);
			if(this.boardChoice!=null){
				for(let i in gameBoard){																					// to locate where the card player placed in gameBoard
					if(gameBoard[i]==y & gameBoard.length !== 0){
						gameBoard.splice(i,1);																				// remove position from gameBoard
						this.choice = i; 																					// the index of the card that the player currently selected
						$(`#PlayerCard${parseInt(this.handsChoice)}`).remove(); 											// remove card from Hands in front-end
					}
				}
				console.log(`checking pushing problem`);
				this.onBoard.push(this.boardChoice); 																		// add card to the array that store what cards players have on board
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
			$(`#cardBoard${y}`).unbind();																			// make selected tile not clickable anymore
		}
	}
	player2.aiPicks();
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
		$(`#cardBoard${x}`).addClass(`${this.name}Card`,2000, `linear`);																	// add selected card from hands to board
		$(`#cardBoard${x} #topNum`).text(`${aiRandom.top}`);
		$(`#cardBoard${x} #leftNum`).text(`${aiRandom.left}`);
		$(`#cardBoard${x} #botNum`).text(`${aiRandom.bottom}`);
		$(`#cardBoard${x} #rightNum`).text(`${aiRandom.right}`);
		$(`#cardBoard${x}`).unbind();																						// make selected tile not clickable anymore
		this.onBoard.push(x); 																								// add card to the array that store what cards players have on board
		for(let i in gameBoard){
			if(gameBoard[i] == x){
				gameBoard.splice(i,1);																						// remove position from gameBoard
				this.readyCheck = 1;
			}
		}
		$(`#CPUCard${this.choice}`).remove();																				// remove card on front end
		if(player2.readyCheck == 1 && player1.readyCheck == 1){
			console.log(`AICard check point 8`)
			this.compareCards(player1);
			if(this.compareCheck == 1){
				this.resetRound();
				console.log(`AICard check point 9`)
				console.log(`player1.onBoard.length ${player1.onBoard.length}`)
				console.log(`player2.onBoard.length ${player2.onBoard.length}`)
			}
		}
	} else if (gameBoard.length == 0){
		this.gameOver();
	}
}
