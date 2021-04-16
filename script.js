const gameBoard = (function() {
	let board = ["", "", "",
				"", "", "",
				"", "", ""
	];

	let switchTurn = true;
	
	function clear(element, round) {
		if (checkAlignments()[0] === true || round === 9) {
			board = ["", "", "",
					"", "", "",
					"", "", ""];
			element.forEach(cell => {
				cell.textContent = "";
				//parent.removeChild(cell);
			});
		} 
	}

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

	function generateGrid(element) {
		const width = element.offsetWidth;
		const height = element.offsetHeight;
		
			const squareWidth = width / 3;
			const squareHeight = height / 3;
			
			for (let i = 0; i < 9; i++) {
				const square = document.createElement("button");
				square.style.width = squareWidth + "px";
				square.style.height = squareHeight + "px";
				square.setAttribute("class", "inner-squares");

				const text = document.createElement("p");
				square.textContent = board[i];
				square.dataset.indexNumber = i;
				square.appendChild(text);
				
				element.appendChild(square);
			}
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
			} else if (xCount === 3) {
				winner = true;
				return "X";
			}
			else if (oCount === 3) {
				winner = true;
				return "O";
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
		let victor = checkWinCondition(xCount, oCount);
		
		return [winner, victor];
	}
	
	return {putMark, generateGrid, checkAlignments, clear,};
})();


const game = (function () {
	const playerOne = createPlayer("player1");
	const playerTwo = createPlayer("player2");

	const gameContainer = document.querySelector(".gameboard");
	const welcomeMessage = document.createElement("p");
	const startButton = document.createElement("button");
	const names = document.createElement("form");
	const playerOneName = document.createElement("input");
	const playerTwoName = document.createElement("input");
	const labelOne = document.createElement("label");
	const labelTwo = document.createElement("label");
	const playerOneSide = document.querySelector(".player-one-side");
	const playerTwoSide = document.querySelector(".player-two-side");
	const bottomContainer = document.querySelector(".vs");
	
	welcomeMessage.setAttribute("class", "welcome-message");
	welcomeMessage.textContent = "Welcome to tic tac toe, what are your names?";
	startButton.setAttribute("class", ".start-game");
	startButton.textContent = "Start";
	labelOne.textContent = "Player One";
	playerOneName.setAttribute("name", "playerOneName");
	playerTwoName.setAttribute("name", "playerTwoName");
	labelTwo.textContent = "Player Two";
	
	gameContainer.appendChild(welcomeMessage);
	names.appendChild(labelOne);
	names.appendChild(playerOneName);
	names.appendChild(labelTwo);
	names.appendChild(playerTwoName);
	gameContainer.appendChild(names);
	gameContainer.appendChild(startButton);
	
	function createPlayer(player, name, score=0) {
		return {player, name, score};
	}
	
	//Game start
	startButton.addEventListener("click", (e) => {
		const playerOne = createPlayer("player1", playerOneName.value);
		const playerTwo = createPlayer("player2", playerTwoName.value);
		playerOneSide.textContent = playerOne.name;
		playerTwoSide.textContent = playerTwo.name;
	
		gameContainer.removeChild(welcomeMessage);
		gameContainer.removeChild(startButton);
		gameContainer.removeChild(names);
	
		gameBoard.generateGrid(gameContainer);
	
		let round = 0;
		const gridCells = document.querySelectorAll(".inner-squares");
		gridCells.forEach(cell => {
			
			function useTurn(e) {
				let indexNumber = e.target.dataset.indexNumber;
				gameBoard.putMark(indexNumber, cell);
		
				round++
				winner = gameBoard.checkAlignments();
				cell.removeEventListener("click", useTurn);
	
				if (winner[0] === true) {
					cell.parentNode.innerHTML += '';
					bottomContainer.textContent = winner[1] + " Wins!";
					addRestart();
				} else if (round === 9) {
					bottomContainer.textContent = "It's a tie!";
					addRestart();
				}
			}
	
			function addRestart() {
				const restartButton = document.createElement("button");
				restartButton.setAttribute("class", "restart");
				restartButton.textContent = "Restart";
				bottomContainer.appendChild(restartButton);
				const gridCells = document.querySelectorAll(".inner-squares");
	
				restartButton.addEventListener("click", () => {
					gameBoard.clear(gridCells, round);
					gameBoard.checkAlignments(); //To reset win status
					bottomContainer.textContent = "";
					restartButton.remove();
	
					//gridCells.forEach(cell => {
						//cell.addEventListener("click", useTurn);
					//});
				});
			}
			
			cell.addEventListener("click", useTurn);
			
		});
	
	});
	
})();