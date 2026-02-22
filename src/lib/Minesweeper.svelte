<script lang="ts">
	import StatusBar from './StatusBar.svelte';
	import Board from './Board.svelte';
	import Footer from './Footer.svelte';

	const ROWS = 8;
	const COLS = 8;
	const MINES = 10;

	type CellData = { mine: boolean; revealed: boolean; flagged: boolean; count: number };
	type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

	let board: CellData[][] = $state([]);
	let status: GameStatus = $state('idle');
	let flagCount = $state(0);
	let timer = $state(0);
	let timerInterval: ReturnType<typeof setInterval> | null = $state(null);
	let isMouseDown = $state(false);

	function startTimer() {
		if (!timerInterval) {
			timerInterval = setInterval(() => {
				timer++;
			}, 1000);
		}
	}

	function stopTimer() {
		if (timerInterval) {
			clearInterval(timerInterval);
			timerInterval = null;
		}
	}

	function createEmptyBoard(): CellData[][] {
		let newBoard = [];
		for (let r = 0; r < ROWS; r++) {
			let row = [];
			for (let c = 0; c < COLS; c++) {
				row.push({ mine: false, revealed: false, flagged: false, count: 0 });
			}
			newBoard.push(row);
		}
		return newBoard;
	}

	function placeMines(excludeR: number, excludeC: number): void {
		let placed = 0;
		while (placed < MINES) {
			let r = Math.floor(Math.random() * ROWS);
			let c = Math.floor(Math.random() * COLS);
			if (board[r][c].mine) continue;
			if (Math.abs(r - excludeR) <= 1 && Math.abs(c - excludeC) <= 1) continue;
			board[r][c].mine = true;
			placed++;
		}

		for (let r = 0; r < ROWS; r++) {
			for (let c = 0; c < COLS; c++) {
				if (!board[r][c].mine) {
					let count = 0;
					for (let dr = -1; dr <= 1; dr++) {
						for (let dc = -1; dc <= 1; dc++) {
							let nr = r + dr, nc = c + dc;
							if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].mine) {
								count++;
							}
						}
					}
					board[r][c].count = count;
				}
			}
		}
	}

	function reveal(r: number, c: number) {
		if (status === 'won' || status === 'lost') return;
		if (board[r][c].revealed || board[r][c].flagged) return;

		if (status === 'idle') {
			status = 'playing';
			placeMines(r, c);
			startTimer();
		}

		board[r][c].revealed = true;

		if (board[r][c].mine) {
			status = 'lost';
			stopTimer();
			for (let row of board) {
				for (let cell of row) {
					if (cell.mine) cell.revealed = true;
				}
			}
			return;
		}

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

	function handleCellClick(r: number, c: number, e: MouseEvent) {
		if (e.button === 0) {
			reveal(r, c);
		}
	}

	function handleCellRightClick(r: number, c: number, e: MouseEvent) {
		e.preventDefault();
		if (status === 'won' || status === 'lost') return;
		if (board[r][c].revealed) return;
		if (status === 'idle') return;

		if (board[r][c].flagged) {
			board[r][c].flagged = false;
			flagCount--;
		} else {
			board[r][c].flagged = true;
			flagCount++;
		}
	}

	function checkWin() {
		let allRevealed = true;
		for (let row of board) {
			for (let cell of row) {
				if (!cell.mine && !cell.revealed) allRevealed = false;
			}
		}
		if (allRevealed) {
			status = 'won';
			stopTimer();
		}
	}

	function restart() {
		stopTimer();
		board = createEmptyBoard();
		status = 'idle';
		flagCount = 0;
		timer = 0;
	}

	function handleBoardMouseDown() {
		if (status === 'idle' || status === 'playing') {
			isMouseDown = true;
		}
	}

	function handleBoardMouseUp() {
		isMouseDown = false;
	}

	function handleBoardMouseLeave() {
		isMouseDown = false;
	}

	board = createEmptyBoard();
</script>

<div class="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-8">
	<div class="flex flex-col items-center gap-4">
		<h1 class="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">Minesweeper</h1>

		<StatusBar
			{timer}
			minesRemaining={MINES - flagCount}
			{status}
			{isMouseDown}
			onrestart={restart}
			width={COLS * 29}
		/>

		<Board
			{board}
			rows={ROWS}
			cols={COLS}
			disabled={status === 'won' || status === 'lost'}
			onmousedown={handleBoardMouseDown}
			onmouseup={handleBoardMouseUp}
			onmouseleave={handleBoardMouseLeave}
			oncellclick={handleCellClick}
			oncellrightclick={handleCellRightClick}
		/>

		<div class="h-6 flex items-center justify-center">
			{#if status === 'won'}
				<p class="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide">Cleared!</p>
			{:else if status === 'lost'}
				<p class="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide">Boom.</p>
			{/if}
		</div>

		<Footer />
	</div>
</div>
