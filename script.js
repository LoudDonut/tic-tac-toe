const gameBoard = (function() {
	let board = ["O", "X", "O",
				"O", "X", "O",
				"X", "O", "X"
	]

	let winner = checkAlignments(board);
	
	function putMark(player) {
		const gridCells = document.querySelectorAll(".inner-squares");
		gridCells.forEach(cell => {
			cell.addEventListener("click", (e) => {
				let selectionIndex = e.target.dataset.indexNumber;
				
				if (player === "player1") {
					board[selectionIndex] = "X";
					cell.textContent = "X";
					cell.style.color = "#00AACC"
				} else {
					board[selectionIndex] = "O";
					cell.textContent = "O";
					cell.style.color = "#AA0000"
				}
	
			});
		});
	}

	function GenerateBoard(selector) {
		const emptyBoard = document.querySelector(selector);
		const width = emptyBoard.offsetWidth;
		const height = emptyBoard.offsetHeight;
		
		const generateGrid = () => {
			const squareWidth = width / 3;
			const squareHeight = height / 3;
			
			for (let i = 0; i < 9; i++) {
				const square = document.createElement("button");
				square.style.width = squareWidth + "px";
				square.style.height = squareHeight + "px";
				square.setAttribute("class", "inner-squares");
				
				const markBoard = index => {
					const text = document.createElement("p");
					square.textContent = board[index];
					
					if (board[index] === "X") {
						square.style.color = "#00AACC";
					} else {
						square.style.color = "#AA0000";
					}
					square.dataset.indexNumber = i;
					square.appendChild(text);
				};
				markBoard(i);
				
				emptyBoard.appendChild(square);
			}
		};
		generateGrid();
	}

	function checkAlignments(board) {
		//horizontal count
		const boardLength = board.length;
		let winner = false;
		let xCount = 0;
		let oCount = 0;
		
		for (let row = 0; row < boardLength; row += 3) {
			for (let cell = row; cell < row + 3; cell++) {
				addFoundMarks(board[cell]);
			}
			checkWinCondition(xCount, oCount);
			if (winner === true) break;
		}
	
		//Vertical count
		for (let column = 0; column < 3 && winner === false; column++) {
			for (let cell = column; cell < column + 7; cell += 3) {
				addFoundMarks(board[cell]);
			}
			checkWinCondition(xCount, oCount);
			if (winner === true) break;
		}
		//Diagonal count
		for (let i = 0; i < boardLength && winner === false; i += 4) {
			addFoundMarks(board[i]);
		}
		checkWinCondition(xCount, oCount);
	
		for (i = 2; i < boardLength - 2 && winner === false; i += 2) {
			console.log(board[i]);
			addFoundMarks(board[i]);
		}
		checkWinCondition(xCount, oCount);
		
		return winner;
	
		function addFoundMarks (mark) {
			if (mark === "X") {
				xCount += 1;
			} else if (mark === "O") {
				oCount += 1;
			}
		}
	
		function checkWinCondition(xAmount, oAmount) {
			if (xAmount != 3 && oAmount != 3) {
				xCount = 0;
				oCount = 0;
			} else {
				winner = true;
			}
		}
	}
	
	return {putMark, generateBoard: GenerateBoard, winner};
})();

function createPlayer(player) {
	return {player};
}

const playerOne = createPlayer("player1");
const playerTwo = createPlayer("player2");

gameBoard.generateBoard(".gameboard");
gameBoard.putMark(playerOne.player);

console.log(gameBoard.winner);

/*let winner = false;
let turn = 1;
while (winner === false) {
	
	if (turn === 1) {
		gameBoard.putMark(playerOne);
		turn = 0;
	} else {
		gameBoard.putMark(playerTwo);
	}
	winner = true;
}*/

//the game starts
//a player gets turn
//the player puts his mark down
//the other player gets his turn
//then he puts a mark down
//if winning condition is accomplished
//then declare the winner and stop