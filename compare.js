compareCards(target){ 																											//compare cards at AI's turn + capture cards
		let x = parseInt(this.boardChoice);
		let p1 = this.onBoard;
		let p2 = target.onBoard;
		let p2Temp = [];
		console.log(`Compare check point 1`)
		if($(`#cardBoard${x} #topNum`).text() > 0 && this.compareCheck == 0){
			if(p1.length >0 && p2.length >0){
				for(let j in p1){
                    let y = parseInt(p1[j]);
					if(x == (y+3)){ 																				// see if current picked card is on top of p2 card
						if($(`#cardBoard${x} #topNum`).text() > $(`#cardBoard${y} #botNum`).text()){
							$(`#cardBoard${y}`).removeClass(`${target.name}Card`);
							$(`#cardBoard${y}`).addClass(`${this.name}Card`);
							p2Temp.push(p1[j]);
							p1.splice(j,1);
							this.compareCheck = 1;
							console.log(`does this work 1`);
						} else {
							this.compareCheck = 1;
							console.log(`there is no match`);
						}
					} else if(x == (y-3)){ 																		// see if p1 card is below of p2 card
						if($(`#cardBoard${x} #botNum`).text() > $(`#cardBoard${y} #topNum`).text()){
							$(`#cardBoard${y}`).removeClass(`${target.name}Card`);
							$(`#cardBoard${y}`).addClass(`${this.name}Card`);
							p2Temp.push(p1[j]);
							p1.splice(j,1);
							this.compareCheck = 1;
							console.log(`does this work 2`);
						} else {
							this.compareCheck = 1;
							console.log(`there is no match`);
						}
					} else if(x == (y+1) && (x % 3 !=0)){															// see if p1 card is one the right of p2 card
						if($(`#cardBoard${x} #leftNum`).text() > $(`#cardBoard${y} #rightNum`).text()){
							$(`#cardBoard${y}`).removeClass(`${target.name}Card`)
							$(`#cardBoard${y}`).addClass(`${this.name}Card`);
							p2Temp.push(p1[j]);
							p1.splice(j,1);
							this.compareCheck = 1;
							console.log(`does this work 3`);
						} else {
							this.compareCheck = 1;
							console.log(`there is no match`);
						}
					} else if(x == (y-1) && (x % 3 !=2)){															// see if p1 card is on the left of p2 card
						if($(`#cardBoard${x} #rightNum`).text() > $(`#cardBoard${y} #leftNum`).text()){
							$(`#cardBoard${y}`).removeClass(`${target.name}Card`)
							$(`#cardBoard${y}`).addClass(`${this.name}Card`);
							p2Temp.push(p1[j]);
							p1.splice(j,1);
							this.compareCheck = 1;
							console.log(`does this work 4`);
						} else {
							this.compareCheck = 1;
							console.log(`there is no match`);
						}
					} else {
						console.log(`Compare check point 2`)
						this.compareCheck = 1;
					}
				}
			}
		}
		if(this.compareCheck == 1){
			if(p2Temp.length > 0){ 																					// add whats in the temporary array to the actual one after cards capturing has been completed.
				player2.onBoard.push(p2Temp[0]);
			}
			p2Temp = [];
			console.log(p2Temp)
		}
	}
