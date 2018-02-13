const printBoard = (board) => {
	let boardToPrint = board.map(row => row.join(" | "))
					   .join("\n");
	console.log(boardToPrint);
};

const generatePlayerBoard = (numRows, numColumns) => {
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
};

const generateBombBoard = (numRows, numColumns, numBombs) => {
	let board = [];
	for(let r=0; r<numRows; r++)
	{
		board.push([]);
		for(let c=0; c<numColumns; c++)
		{
			board[r].push(" ");
		}
	}

	let numBombsPlaced = 0;

	while(numBombsPlaced < numBombs)
	{
		let row = Math.floor(Math.random() * numRows);
		let column = Math.floor(Math.random() * numColumns);
		
		// This can place multiple bombs in the same place and not count it.
		// This will be fixed later.
		board[row][column] = "B";
		numBombsPlaced++;
	}

	return board;
};

// let board = [
// 		[" ", " ", " "],
// 		[" ", " ", " "],
// 		[" ", " ", " "],
// 	];

let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log("Player Board:");
printBoard(playerBoard);

console.log("Bomb Board:");
printBoard(bombBoard);