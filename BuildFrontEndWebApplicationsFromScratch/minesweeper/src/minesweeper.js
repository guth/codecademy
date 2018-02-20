class Board
{
	constructor(numRows, numColumns, numBombs)
	{
		this._numRows = numRows;
		this._numColumns = numColumns;
		this._numBombs = numBombs;
		this._numTiles = numRows * numColumns;
		this._playerBoard = Board.generatePlayerBoard(numRows, numColumns);
		this._bombBoard = Board.generateBombBoard(numRows, numColumns, numBombs);
	}

	get playerBoard()
	{
		return this._playerBoard;
	}

	flipTile(row, column)
	{
		if(this._playerBoard[row][column] !== " ")
		{
			console.log("This tile has already been flipped!");
			return;
		}
		else if(this._bombBoard[row][column] === "B")
		{
			this._playerBoard[row][column] = "B";
		}
		else
		{
			let numBombs = this.getNumberOfNeighborBombs(row, column);
			this._playerBoard[row][column] = numBombs;
		}

		this._numTiles--;
	}

	getNumberOfNeighborBombs(row, column)
	{
		const neighborOffsets = [
			[-1, -1], [0, -1], [1, -1],
			[-1, 0],         , [1, 0],
			[-1, 1],  [0, 1],  [1, 1],
			];

		const numRows = this._bombBoard.length;
		const numColumns = this._bombBoard[0].length;

		let numberOfBombs = 0;

		neighborOffsets.forEach(offset => {
			const nextRow = row + offset[0];
			const nextColumn = column + offset[1];

			if(nextRow >= 0 && nextRow < numRows
				&& nextColumn >= 0 && nextColumn < numColumns)
			{
				if(this._bombBoard[nextRow][nextColumn] === "B")
				{
					numberOfBombs++;
				}
			}
		});

		return numberOfBombs;
	}

	hasSafeTiles()
	{
		return (this._numTiles !== this._numBombs);
	}
	
	print()
	{
		let boardToPrint = this._playerBoard.map(row => row.join(" | "))
											.join("\n");
		console.log(boardToPrint);
		console.log("----------");

		let bombBoardToPrint = this._bombBoard.map(row => row.join(" | "))
											.join("\n");
		console.log(bombBoardToPrint);
		console.log("----------");
	}

	static generatePlayerBoard(numRows, numColumns)
	{
		let board = [];
		for(let r=0; r<numRows; r++)
		{
			board.push([]);
			for(let c=0; c<numColumns; c++)
			{
				board[r].push(" ");
			}
		}

		return board;
	}

	static generateBombBoard(numRows, numColumns, numBombs)
	{
		let board = Board.generatePlayerBoard(numRows, numColumns);
		let numBombsPlaced = 0;

		while(numBombsPlaced < numBombs)
		{
			let row = Math.floor(Math.random() * numRows);
			let column = Math.floor(Math.random() * numColumns);
			
			if(board[row][column] !== "B")
			{
				board[row][column] = "B";
				numBombsPlaced++;
			}
		}

		return board;
	}
}

class Game
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

const g = new Game(3, 3, 3);

g.playMove(0, 0);