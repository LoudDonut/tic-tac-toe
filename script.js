const gameBoard = (function() {
	let board = ["", "", "",
				"", "", "",
				"", "", ""
	]

	let switchTurn = true;
	
	function putMark(indexNumber, element) {
		if (switchTurn === true) {
			board[indexNumber] = "X";
			element.textContent = "X";
			element.style.color = "#00AACC"
			switchTurn = false;
		} else {
			board[indexNumber] = "O";
			element.textContent = "O";
			element.style.color = "#AA0000"
			switchTurn = true;
		}
	}

	function generateBoard(selector) {
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

	function checkAlignments() {

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

		//Horizontal count
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
			addFoundMarks(board[i]);
		}
		checkWinCondition(xCount, oCount);
		
		return winner;
	}
	
	return {putMark, generateBoard, checkAlignments};
})();

function createPlayer(player) {
	return {player};
}

const playerOne = createPlayer("player1");
const playerTwo = createPlayer("player2");

const gameContainer = document.querySelector(".gameboard");
const welcomeMessage = document.createElement("p");
const startButton = document.createElement("button");

welcomeMessage.setAttribute("class", "welcome-message");
welcomeMessage.textContent = "Welcome to tic tac toe, press start to play!";
startButton.setAttribute("class", ".start-game");
startButton.textContent = "Start Game"

gameContainer.appendChild(welcomeMessage);
gameContainer.appendChild(startButton);

startButton.addEventListener("click", () => {

	gameContainer.removeChild(welcomeMessage);
	gameContainer.removeChild(startButton);
	gameBoard.generateBoard(".gameboard");

	let game = true;;
	let round = 0;
	const gridCells = document.querySelectorAll(".inner-squares");
	gridCells.forEach(cell => {
		function useTurn(e) {
	
			let indexNumber = e.target.dataset.indexNumber;
			gameBoard.putMark(indexNumber, cell);
	
			round++
			winner = gameBoard.checkAlignments();
			console.log(winner);
			if (winner === true) game = false;

			cell.removeEventListener("click", useTurn);
		}
		cell.addEventListener("click", useTurn);
	});

});