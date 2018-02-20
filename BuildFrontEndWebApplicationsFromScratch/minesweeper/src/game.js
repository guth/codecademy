// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import { Board } from './board';

export class Game
{
	constructor(numRows, numColumns, numBombs)
	{
		this._board = new Board(numRows, numColumns, numBombs);
	}

	playMove(row, column)
	{
		console.log(`Playing location (${row}, ${column})`);

		this._board.flipTile(row, column);

		// console.log("Flip tile complete.");

		console.log("Current board:");
		this._board.print();

		if(this._board.playerBoard[row][column] === "B")
		{
			// It's a bomb, player loses.
			console.log("You clicked on a bomb.");
			console.log("Game over.");
		}
		else if(!this._board.hasSafeTiles())
		{
			// No more safe tiles, player has won.
			console.log("Congratulations, you win!");
		}
		else
		{
			// Game isn't over yet.
			console.log("Keep going.");
		}
	}
}