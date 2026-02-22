<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Board from '$lib/Board.svelte';

	const { Story } = defineMeta({
		title: 'Game/Board',
		component: Board,
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component: 'The game grid containing all cells. Handles cell interactions and layout.'
				}
			}
		},
		argTypes: {
			rows: { control: { type: 'number', min: 4, max: 16 }, description: 'Number of rows' },
			cols: { control: { type: 'number', min: 4, max: 16 }, description: 'Number of columns' },
			disabled: { control: 'boolean', description: 'Whether the board is disabled (game over)' }
		}
	});

	// Create sample boards
	function createEmptyBoard(rows, cols) {
		let board = [];
		for (let r = 0; r < rows; r++) {
			let row = [];
			for (let c = 0; c < cols; c++) {
				row.push({ mine: false, revealed: false, flagged: false, count: 0 });
			}
			board.push(row);
		}
		return board;
	}

	function createPartialBoard() {
		let board = createEmptyBoard(8, 8);
		// Reveal some cells with counts
		board[0][0] = { mine: false, revealed: true, flagged: false, count: 0 };
		board[0][1] = { mine: false, revealed: true, flagged: false, count: 0 };
		board[0][2] = { mine: false, revealed: true, flagged: false, count: 1 };
		board[1][0] = { mine: false, revealed: true, flagged: false, count: 0 };
		board[1][1] = { mine: false, revealed: true, flagged: false, count: 1 };
		board[1][2] = { mine: false, revealed: true, flagged: false, count: 2 };
		board[2][0] = { mine: false, revealed: true, flagged: false, count: 1 };
		board[2][1] = { mine: false, revealed: true, flagged: false, count: 2 };
		// Flag some cells
		board[2][3] = { mine: true, revealed: false, flagged: true, count: 0 };
		board[4][5] = { mine: true, revealed: false, flagged: true, count: 0 };
		board[6][1] = { mine: true, revealed: false, flagged: true, count: 0 };
		return board;
	}

	function createWonBoard() {
		let board = createEmptyBoard(8, 8);
		// All non-mine cells revealed, mines flagged
		for (let r = 0; r < 8; r++) {
			for (let c = 0; c < 8; c++) {
				if ((r === 3 && c === 3) || (r === 5 && c === 2) || (r === 1 && c === 6)) {
					board[r][c] = { mine: true, revealed: false, flagged: true, count: 0 };
				} else {
					let count = 0;
					// Calculate adjacent mines
					if (r === 2 && c >= 2 && c <= 4) count = 1;
					if (r === 3 && (c === 2 || c === 4)) count = 1;
					if (r === 4 && c >= 2 && c <= 4) count = 1;
					board[r][c] = { mine: false, revealed: true, flagged: false, count };
				}
			}
		}
		return board;
	}

	function createLostBoard() {
		let board = createEmptyBoard(8, 8);
		// Reveal mines (exploded)
		board[3][3] = { mine: true, revealed: true, flagged: false, count: 0 };
		board[5][2] = { mine: true, revealed: true, flagged: false, count: 0 };
		board[1][6] = { mine: true, revealed: true, flagged: false, count: 0 };
		// Some revealed cells
		board[0][0] = { mine: false, revealed: true, flagged: false, count: 0 };
		board[0][1] = { mine: false, revealed: true, flagged: false, count: 0 };
		board[0][2] = { mine: false, revealed: true, flagged: false, count: 1 };
		board[1][0] = { mine: false, revealed: true, flagged: false, count: 0 };
		board[1][1] = { mine: false, revealed: true, flagged: false, count: 1 };
		return board;
	}

	const emptyBoard = createEmptyBoard(8, 8);
	const partialBoard = createPartialBoard();
	const wonBoard = createWonBoard();
	const lostBoard = createLostBoard();
	const smallBoard = createEmptyBoard(4, 4);
	const largeBoard = createEmptyBoard(12, 12);
</script>

<Story name="New Game" args={{ board: emptyBoard, rows: 8, cols: 8, disabled: false }} />

<Story name="In Progress" args={{ board: partialBoard, rows: 8, cols: 8, disabled: false }} />

<Story name="Won" args={{ board: wonBoard, rows: 8, cols: 8, disabled: true }} />

<Story name="Lost" args={{ board: lostBoard, rows: 8, cols: 8, disabled: true }} />

<Story name="Small (4x4)" args={{ board: smallBoard, rows: 4, cols: 4, disabled: false }} />

<Story name="Large (12x12)" args={{ board: largeBoard, rows: 12, cols: 12, disabled: false }} />
