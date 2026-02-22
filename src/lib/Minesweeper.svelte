<script lang="ts">
	import Cell from './Cell.svelte';

	const ROWS = 8;
	const COLS = 8;
	const MINES = 10;

	type CellData = { mine: boolean; revealed: boolean; flagged: boolean; count: number };

	let board: CellData[][] = $state([]);
	let gameOver = $state(false);
	let won = $state(false);

	function createBoard(): CellData[][] {
		// Create empty board
		let newBoard = [];
		for (let r = 0; r < ROWS; r++) {
			let row = [];
			for (let c = 0; c < COLS; c++) {
				row.push({ mine: false, revealed: false, flagged: false, count: 0 });
			}
			newBoard.push(row);
		}

		// Place mines randomly
		let placed = 0;
		while (placed < MINES) {
			let r = Math.floor(Math.random() * ROWS);
			let c = Math.floor(Math.random() * COLS);
			if (!newBoard[r][c].mine) {
				newBoard[r][c].mine = true;
				placed++;
			}
		}

		// Calculate neighbor counts
		for (let r = 0; r < ROWS; r++) {
			for (let c = 0; c < COLS; c++) {
				if (!newBoard[r][c].mine) {
					let count = 0;
					for (let dr = -1; dr <= 1; dr++) {
						for (let dc = -1; dc <= 1; dc++) {
							let nr = r + dr, nc = c + dc;
							if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && newBoard[nr][nc].mine) {
								count++;
							}
						}
					}
					newBoard[r][c].count = count;
				}
			}
		}

		return newBoard;
	}

	function reveal(r: number, c: number) {
		if (gameOver || won || board[r][c].revealed || board[r][c].flagged) return;

		board[r][c].revealed = true;

		if (board[r][c].mine) {
			gameOver = true;
			// Reveal all mines
			for (let row of board) {
				for (let cell of row) {
					if (cell.mine) cell.revealed = true;
				}
			}
			return;
		}

		// Flood fill for empty cells
		if (board[r][c].count === 0) {
			for (let dr = -1; dr <= 1; dr++) {
				for (let dc = -1; dc <= 1; dc++) {
					let nr = r + dr, nc = c + dc;
					if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
						reveal(nr, nc);
					}
				}
			}
		}

		checkWin();
	}

	function toggleFlag(e: MouseEvent, r: number, c: number) {
		e.preventDefault();
		if (gameOver || won || board[r][c].revealed) return;
		board[r][c].flagged = !board[r][c].flagged;
	}

	function checkWin() {
		let allRevealed = true;
		for (let row of board) {
			for (let cell of row) {
				if (!cell.mine && !cell.revealed) allRevealed = false;
			}
		}
		if (allRevealed) won = true;
	}

	function restart() {
		board = createBoard();
		gameOver = false;
		won = false;
	}

	// Initialize
	board = createBoard();
</script>

<div class="minesweeper">
	<h2>Minesweeper</h2>
	{#if gameOver}
		<p style="color: red;">Game Over!</p>
	{:else if won}
		<p style="color: green;">You Won!</p>
	{/if}
	<button onclick={restart}>New Game</button>
	<div class="board">
		{#each board as row, r (r)}
			<div class="row">
				{#each row as cell, c (c)}
					<Cell
						mine={cell.mine}
						revealed={cell.revealed}
						flagged={cell.flagged}
						count={cell.count}
						onclick={() => reveal(r, c)}
						oncontextmenu={(e) => toggleFlag(e, r, c)}
					/>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.minesweeper {
		font-family: sans-serif;
		text-align: center;
	}
	.board {
		display: inline-block;
		margin-top: 10px;
	}
	.row {
		display: flex;
	}
</style>
