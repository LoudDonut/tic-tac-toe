const game = (function() {
	gameboard = {
		board: ["X", "O", "X",
				"O", "X", "O",
				"X", "O", "X"
		],
		
		putMark: function(player) {
			const gridCells = document.querySelectorAll(".inner-squares");
			gridCells.forEach(cell => {
				cell.addEventListener("click", (e) => {
					let selectionIndex = e.target.dataset.indexNumber;
					
					if (player === "player1") {
						game.gameboard.board[selectionIndex] = "X";
					} else {
						game.gameboard.board[selectionIndex] = "O";
					}
		
					console.log(game.gameboard.board);
				});
			});
		},

		generateBoard: function(selector) {
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
						square.textContent = game.gameboard.board[index];
						
						if (game.gameboard.board[index] === "X") {
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

	};
	
	return {gameboard};
})();

function createPlayer() {

}

game.gameboard.generateBoard(".gameboard");
game.gameboard.putMark("player1");