const state = {
	board: ['', '', '', '', '', '', '', '', ''],
	nextPlayer: 'x',
	winner: 'none',
}

function play (cellNumber) {
	if (state.board[cellNumber-1] !== '') return;

	state.board[cellNumber-1] = state.nextPlayer;

	state.nextPlayer = state.nextPlayer === 'x'? 'o': 'x';

	fillCell(cellNumber);
	checkWinner();
}

function checkWinner () {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let line of lines) {
		if (state.board[line[0]]===state.board[line[1]] && state.board[line[1]]===state.board[line[2]] 
			&& state.board[line[0]] !== '')
		{
			state.winner = state.board[line[0]];
			console.log(state.winner);
			showWinner();
			break;
		}
	}

	if (!state.board.includes('')) {
		showWinner();
	}
}

function showWinner () {
	document.querySelector('body').innerHTML  = 'Winner: ' + state.winner;

}

function handleClick (event) {
	play(event.target.id);
}

function fillCell (cellNumber) {
	document.getElementById(cellNumber).textContent = state.board[cellNumber-1];
}

const cells = document.querySelectorAll('.cell');
const cellsArray = Array.from(cells);
for (let cell of cellsArray) {
	cell.addEventListener('click', handleClick);
}