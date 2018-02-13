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
		
		if(board[row][column] !== "B")
		{
			board[row][column] = "B";
			numBombsPlaced++;
		}
	}

	return board;
};

const getNumberOfNeighborBombs = (board, row, column) => {
	const neighborOffsets = [
		[-1, -1], [0, -1], [1, -1],
		[-1, 0],         , [1, 0],
		[-1, 1],  [0, 1],  [1, 1],
		];

	const numRows = board.length;
	const numColumns = board[0].length;

	let numberOfBombs = 0;

	neighborOffsets.forEach(offset => {
		const nextRow = row + offset[0];
		const nextColumn = column + offset[1];

		if(nextRow >= 0 && nextRow < numRows
			&& nextColumn >= 0 && nextColumn < numColumns)
		{
			if(board[nextRow][nextColumn] === "B")
			{
				numberOfBombs++;
			}
		}
	});

	return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, row, column) => {
	if(playerBoard[row][column] !== " ")
	{
		console.log("This tile has already been flipped!");
		return;
	}
	else if(bombBoard[row][column] === "B")
	{
		playerBoard[row][column] = "B";
	}
	else
	{
		let numBombs = getNumberOfNeighborBombs(bombBoard, row, column);
		playerBoard[row][column] = numBombs;
	}
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

flipTile(playerBoard, bombBoard, 0, 0);
console.log("Updated player board:");
printBoard(playerBoard);