const game = (function() {
	gameboard = {
		board: ["X", "O", "X",
				"O", "X", "O",
				"X", "O", "X"
		],
		generateBoard: function(selector) {
			const emptyBoard = document.querySelector(selector);
			const width = emptyBoard.offsetWidth;
			const height = emptyBoard.offsetHeight;
			
			const generateGrid = () => {
				const squareWidth = width / 3;
				const squareHeight = height / 3;
				
				for (let i = 0; i < 9; i++) {
					const square = document.createElement("div");
					square.style.width = squareWidth + "px";
					square.style.height = squareHeight + "px";
					square.setAttribute("class", "inner-squares");
					
					const markBoard = index => {
						const text = document.createElement("p");
						text.textContent = game.gameboard.board[index];
						if (game.gameboard.board[index] === "X") {
							text.style.color = "#00AACC";
						} else {
							text.style.color = "#AA0000";
						}
						square.appendChild(text);
					};
					markBoard(i);
					
					emptyBoard.appendChild(square);
				}

			};
			generateGrid();

		}
	};
	
	return {gameboard};
})();

function createPlayer() {

}

game.gameboard.generateBoard(".gameboard");