compareCards(target){ 																											//compare cards at AI's turn + capture cards
let x = parseInt(this.boardChoice);
let p1 = this.onBoard;
let p2 = target.onBoard;
let pTemp = [];
console.log(`Compare check point 1`)
if($(`#cardBoard${x} #topNum`).text() > 0 && this.compareCheck == 0){
	if(p1.length >0 && p2.length >0){
		for(let j in p2){
			let y = parseInt(p2[j]);
			if(x == (y+3)){ 																				                // see if current picked card is on top of p2 card
				if($(`#cardBoard${x} #topNum`).text() > $(`#cardBoard${y} #botNum`).text()){
					$(`#cardBoard${y}`).removeClass(`${target.name}Card`);
					$(`#cardBoard${y}`).addClass(`${this.name}Card`);
					pTemp.push(p2[j]);
					p2.splice(j,1);
					for(let i in p2){
						let z = parseInt(p2[i]);
						if((x == z+1 && x%3 != 0)){
							if($(`#cardBoard${x} #leftNum`).text() > $(`#cardBoard${z} #rightNum`).text()){
								$(`#cardBoard${z}`).removeClass(`${target.name}Card`);
								$(`#cardBoard${z}`).addClass(`${this.name}Card`);
								pTemp.push(p2[i]);
								p2.splice(i,1);
							}
						} else if ((x == z-1 && x%3 != 2)){
							if($(`#cardBoard${x} #rightNum`).text() > $(`#cardBoard${z} #leftNum`).text()){
								$(`#cardBoard${z}`).removeClass(`${target.name}Card`);
								$(`#cardBoard${z}`).addClass(`${this.name}Card`);
								pTemp.push(p2[i]);
								p2.splice(i,1);
							}
						} else {
							console.log(`there is no match within`)
						}
					}
					this.compareCheck = 1;
					console.log(`does this work 1`);
				} else {
					this.compareCheck = 1;
					console.log(`there is no match`);
				}
			} else if(x == (y-3)){ 																		           // see if p1 card is below of p2 card
				if($(`#cardBoard${x} #botNum`).text() > $(`#cardBoard${y} #topNum`).text()){
					$(`#cardBoard${y}`).removeClass(`${target.name}Card`);
					$(`#cardBoard${y}`).addClass(`${this.name}Card`);
					pTemp.push(p2[j]);
					p2.splice(j,1);
					for(let i in p2){
						let z = parseInt(p2[i]);
						if((x == z+1 && x%3 != 0)){
							if($(`#cardBoard${x} #leftNum`).text() > $(`#cardBoard${z} #rightNum`).text()){
								$(`#cardBoard${z}`).removeClass(`${target.name}Card`);
								$(`#cardBoard${z}`).addClass(`${this.name}Card`);
								pTemp.push(p2[i]);
								p2.splice(i,1);
							}
						} else if ((x == z-1 && x%3 != 2)){
							if($(`#cardBoard${x} #rightNum`).text() > $(`#cardBoard${z} #leftNum`).text()){
								$(`#cardBoard${z}`).removeClass(`${target.name}Card`);
								$(`#cardBoard${z}`).addClass(`${this.name}Card`);
								pTemp.push(p2[i]);
								p2.splice(i,1);
							}
						} else {
							console.log(`there is no match within`)
						}
					}
					this.compareCheck = 1;
					console.log(`does this work 2`);
				} else {
					this.compareCheck = 1;
					console.log(`there is no match`);
				}
			} else if( (x == (y+1) && x % 3 !=0)){															// see if p1 card is one the right of p2 card
				if($(`#cardBoard${x} #leftNum`).text() > $(`#cardBoard${y} #rightNum`).text()){
					$(`#cardBoard${y}`).removeClass(`${target.name}Card`)
					$(`#cardBoard${y}`).addClass(`${this.name}Card`);
					pTemp.push(p2[j]);
					p2.splice(j,1);
					for(let i in p2){
						let z = parseInt(p2[i]);
						if(x == z+3){
							if($(`#cardBoard${x} #topNum`).text() > $(`#cardBoard${z} #botNum`).text()){
								$(`#cardBoard${z}`).removeClass(`${target.name}Card`);
								$(`#cardBoard${z}`).addClass(`${this.name}Card`);
								pTemp.push(p2[i]);
								p2.splice(i,1);
							}
						} else if (x == z-3){
							if($(`#cardBoard${x} #botNum`).text() > $(`#cardBoard${z} #topNum`).text()){
								$(`#cardBoard${z}`).removeClass(`${target.name}Card`);
								$(`#cardBoard${z}`).addClass(`${this.name}Card`);
								pTemp.push(p2[i]);
								p2.splice(i,1);
							}
						} else {
							console.log(`there is no match within`)
						}
					}
					this.compareCheck = 1;
					console.log(`does this work 3`);
				} else {
					this.compareCheck = 1;
					console.log(`there is no match`);
				}
			} else if( (x == (y-1) && x % 3 !=2) ){															// see if p1 card is on the left of p2 card
				if($(`#cardBoard${x} #rightNum`).text() > $(`#cardBoard${y} #leftNum`).text()){
					$(`#cardBoard${y}`).removeClass(`${target.name}Card`)
					$(`#cardBoard${y}`).addClass(`${this.name}Card`);
					pTemp.push(p2[j]);
					p2.splice(j,1);
					for(let i in p2){
						let z = parseInt(p2[i]);
						if(x == z+3){
							if($(`#cardBoard${x} #topNum`).text() > $(`#cardBoard${z} #botNum`).text()){
								$(`#cardBoard${z}`).removeClass(`${target.name}Card`);
								$(`#cardBoard${z}`).addClass(`${this.name}Card`);
								pTemp.push(p2[i]);
								p2.splice(i,1);
							}
						} else if (x == z-3){
							if($(`#cardBoard${x} #botNum`).text() > $(`#cardBoard${z} #topNum`).text()){
								$(`#cardBoard${z}`).removeClass(`${target.name}Card`);
								$(`#cardBoard${z}`).addClass(`${this.name}Card`);
								pTemp.push(p2[i]);
								p2.splice(i,1);
							}
						} else {
							console.log(`there is no match within`)
						}
					}
					this.compareCheck = 1;
					console.log(`does this work 4`);
				} else {
					this.compareCheck = 1;
					console.log(`there is no match`);
				}

			} else {
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
	if(pTemp.length > 0){ 																					// add whats in the temporary array to the actual one after cards capturing has been completed.
		this.onBoard.push(pTemp[0]);
	}
	pTemp = [];
	console.log(pTemp)
}
}
