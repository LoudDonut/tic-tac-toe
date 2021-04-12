const gameBoard = (function() {
	let board = ["X", "O", "X",
				"O", "X", "O",
				"X", "O", "X"
	]
	
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
	
	return {putMark, generateBoard: GenerateBoard};
})();

function createPlayer(player) {
	return {player};
}

const playerOne = createPlayer("player1");
const playerTwo = createPlayer("player2");

gameBoard.generateBoard(".gameboard");
gameBoard.putMark(playerOne.player);

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


//what are the winning conditions?
function checkAlignments() {
	let board = ["X", "O", "X",
				"O", "X", "O",
				"X", "O", "X"
	]
	
	//horizontal count
	const boardLength = board.length;
	let winner = false;
	let horizontalX = 0;
	let horizontalO = 0;
	
	for (let row = 0; row < boardLength; row += 3) {
		for (let cell = row; cell < row + 3; cell++) {
			const addFoundMarks = function (mark) {
				if (mark === "X") {
					horizontalX += 1;
				} else if (mark === "O") {
					horizontalO += 0;
				}
			};
			addFoundMarks(board[cell]);
		}
		if (horizontalX != 3) {
			horizontalX = 0;
		} else {
			winner = true;
		}
	}
	console.log(horizontalX);

	//vertical count
	let verticalX = 0;
	for (let column = 0; column < 3; column++) {
		console.log("column: " + column);
		for (let cell = column; cell < column + 7; cell += 3) {
			console.log("cell: " + cell);
		}
	}
	console.log(verticalX);

	//diagonal count
	let diagonalX = 0;

	for (let i = 0; i < boardLength; i += 4) {
		console.log("diagonal: " + i);
	}
	for (i = 2; i < boardLength - 2; i += 2) {
		console.log("diagonal: " + i);
	}
	console.log(diagonalX);
}
checkAlignments();