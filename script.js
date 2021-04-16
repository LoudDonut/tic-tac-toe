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
			});
		} 
	}

	function putMark(indexNumber, element, playerOneTurn, playerTwoTurn) {
		if (switchTurn === true) {
			board[indexNumber] = "X";
			element.textContent = "X";
			playerOneTurn.textContent = "";
			playerTwoTurn.textContent = "*";
			element.style.color = "#00AACC"
			switchTurn = false;
		} else {
			board[indexNumber] = "O";
			element.textContent = "O";
			playerTwoTurn.textContent = "";
			playerOneTurn.textContent = "*";
			element.style.color = "#E80000"
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
	const playerOneInput = document.createElement("input");
	const playerTwoInput = document.createElement("input");
	const labelOne = document.createElement("label");
	const labelTwo = document.createElement("label");
	const playerOneSide = document.querySelector(".player-one-side");
	const playerOneScore = document.querySelector("#player-one-score");
	const playerOneName = document.querySelector("#player-one-name")
	const playerOneTurn = document.querySelector("#player-one-turn");
	const playerTwoSide = document.querySelector(".player-two-side");
	const playerTwoScore = document.querySelector("#player-two-score");
	const playerTwoTurn = document.querySelector("#player-two-turn");
	const playerTwoName = document.querySelector("#player-two-name");
	const bottomContainer = document.querySelector(".vs");
	
	welcomeMessage.setAttribute("class", "welcome-message");
	welcomeMessage.textContent = "Welcome to tic tac toe, what are your names?";
	startButton.setAttribute("class", "start-game");
	startButton.textContent = "Start";
	labelOne.textContent = "Player:";
	playerOneInput.setAttribute("name", "playerOneName");
	playerTwoInput.setAttribute("name", "playerTwoName");
	labelTwo.textContent = "Player:";
	
	gameContainer.appendChild(welcomeMessage);
	names.appendChild(labelOne);
	names.appendChild(playerOneInput);
	names.appendChild(labelTwo);
	names.appendChild(playerTwoInput);
	gameContainer.appendChild(names);
	gameContainer.appendChild(startButton);
	
	function createPlayer(player, name, score=0) {
		return {player, name, score};
	}
	
	startButton.addEventListener("click", (e) => {
		const playerOne = createPlayer("player1", playerOneInput.value);
		const playerTwo = createPlayer("player2", playerTwoInput.value);
		playerOneName.textContent = playerOne.name;
		playerTwoName.textContent = playerTwo.name;
		playerOneScore.textContent = playerOne.score;
		playerTwoScore.textContent = playerTwo.score;
		playerOneTurn.textContent = "*";
	
		gameContainer.removeChild(welcomeMessage);
		gameContainer.removeChild(startButton);
		gameContainer.removeChild(names);
	
		gameBoard.generateGrid(gameContainer);
		
		function startRound() {
			let round = 0;
			const gridCells = document.querySelectorAll(".inner-squares");
			gridCells.forEach(cell => {
				
				function useTurn(e) {
					let indexNumber = e.target.dataset.indexNumber;
					gameBoard.putMark(indexNumber, cell, playerOneTurn,
						playerTwoTurn);

					round++
					winner = gameBoard.checkAlignments();
					cell.removeEventListener("click", useTurn);
		
					if (winner[0] === true) {
						cell.parentNode.innerHTML += '';
						bottomContainer.textContent = winner[1] + " Wins!";
						addScore(winner[1]);
						addRestart();
					} else if (round === 9) {
						bottomContainer.textContent = "It's a tie!";
						addRestart();
					}
				}
		
				function addRestart() {
					const restartButton = document.createElement("button");
					restartButton.setAttribute("class", "restart");
					restartButton.textContent = "Play Round";
					bottomContainer.appendChild(restartButton);
					const gridCells = document.querySelectorAll(".inner-squares");
		
					restartButton.addEventListener("click", () => {
						gameBoard.clear(gridCells, round);
						gameBoard.checkAlignments(); //To reset win status
						bottomContainer.textContent = "";
						restartButton.remove();

						startRound();
					});
				}

				function addScore(player) {
					if (player === "X") {
						playerOne.score++
						playerOneScore.textContent = playerOne.score;
					} else {
						playerTwo.score++
						playerTwoScore.textContent = playerTwo.score;
					}
				}
				
				cell.addEventListener("click", useTurn);
				
			});
	
		}
		startRound();
	});
})();