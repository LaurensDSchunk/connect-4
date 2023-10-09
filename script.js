const boardElement = document.getElementById("tiles");
const mainText = document.getElementById("mainText");
const secondaryText = document.getElementById("secondaryText");
let board = [
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0]
];
computerMove();
updateBoard();
boardElement.addEventListener("click", function(table) {
	if (isWin() == false) {
		let x = table.target.cellIndex;
		let y = table.target.parentElement.rowIndex;
		for (let i = 5; i >= 0; i--) {
			if (board[i][x] == 0 && isWin() == false) {
				board[i][x] = 1;
				updateBoard();
				computerMove();
				break;
			}
		}
		switch(isWin()) {
			case true:
				mainText.innerText = "It's a tie!";
				break;
			case 1:
				mainText.innerText = "You win!";
				break;
			case 2:
				mainText.innerText = "The computer wins!";
				break;
		}
		if (isWin() != false) {
			secondaryText.innerText = "Click the board to play again!";
		}
		updateBoard();
	}else{
		board = [
			[0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0]
		];
		mainText.innerText = "Connect-4";
		secondaryText.innerText = "You've gotta get 4 in a row!";
		computerMove();
		updateBoard();
	}
	updateBoard();
});
function computerMove() {
	if (isWin() == false) {
		let score = 0;
		let move = [,]
		let bestScore = -2;
		for (let x = 0; x <= 6; x++) {
			for (let y = 5; y >= 0; y--) {
				if (board[y][x] == 0) {
					board[y][x] = 2;
					score = minimax(5,false);
					board[y][x] = 0;
					if (score > bestScore) {
						bestScore = score;
						move = [x,y];
					}
					break;
				}
			}
		}
		board[move[1]][move[0]] = 2;
	}
}
function minimax(depth,maximizing) {
	switch (isWin()) {
		case false:
			if (depth == 0) {
				return 0;
			}
			let score = 0;
			let bestScore;
			if (maximizing) {
				bestScore = -2;
			}else{
				bestScore = 2;
			}
			for (let x = 0; x <= 6; x++) {
				for (let y = 5; y >= 0; y--) {
					if (board[y][x] == 0) {
						if (maximizing) {
							board[y][x] = 2;
							score = minimax(depth-1,false);
							board[y][x] = 0;
							if (score == 1) {
								return 1;
							}
							if (score > bestScore) {
								bestScore = score;
							}
						}
						if (!maximizing) {
							board[y][x] = 1;
							score = minimax(depth-1,true);
							board[y][x] = 0;
							if (score == -1) {
								return -1;
							}
							if (score < bestScore){
								bestScore = score;
							}
						}
						break;
					}
				}
			}
			return bestScore;
			break;
		case true:
			return 0;
			break;
		case 1: 
			return -1;
			break;
		case 2:
			return 1;
			break;
	}
}
function updateBoard() {
	for (let x = 0; x <= 6; x++) {
		for (let y = 0; y <= 5; y++) {
			if (board[y][x] == 0) {
				boardElement.rows[y].cells[x].style.backgroundColor = "white";
			}
			if (board[y][x] == 1) {
				boardElement.rows[y].cells[x].style.backgroundColor = "red";
			}
			if (board[y][x] == 2) {
				boardElement.rows[y].cells[x].style.backgroundColor = "yellow";
			}
		}	
	}
}
function isWin() {
	for (let x = 0; x <= 3; x++) {
		for (let y = 0; y <= 2; y++) {
			if (board[y][x] != 0 && board[y][x] == board[y+1][x+1] && board[y+1][x+1] == board[y+2][x+2] && board[y+2][x+2] == board[y+3][x+3]) {
				return board[y][x];
			}
			if (board[y+3][x] != 0 && board[y+3][x] == board[y+2][x+1] && board[y+2][x+1] == board[y+1][x+2] && board[y+1][x+2] == board[y][x+3]) {
				return board[y+3][x];
			}
		}
		for (let y = 0; y <= 5; y++) {
			if (board[y][x] != 0 && board[y][x] == board[y][x+1] && board[y][x+1] == board[y][x+2] && board[y][x+2] == board[y][x+3]) {
				return board[y][x];
			}
		}
	}
	for (let x = 0; x <= 6; x++) {
		for (let y = 0; y <= 2; y++) {
			if (board[y][x] != 0 && board[y][x] == board[y+1][x] && board[y+1][x] == board[y+2][x] && board[y+2][x] == board[y+3][x]) {
				return board[y][x];
			}
		}
	}
	for (let x = 0; x <= 6; x++) {
		for (let y = 0; y <= 5; y++) {
			if (board[y][x] == 0) {
				return false;
			}
		}
	}
	return true;
}
