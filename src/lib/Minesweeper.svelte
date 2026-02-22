<script lang="ts">
	import Cell from './Cell.svelte';

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

	function handleCellMouseUp(e: MouseEvent, r: number, c: number) {
		// Only reveal on left click (button 0)
		if (e.button === 0) {
			reveal(r, c);
		}
	}

	function toggleFlag(e: MouseEvent, r: number, c: number) {
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

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
		<!-- Controls bar -->
		<div class="flex items-center justify-between w-full" style="max-width: {COLS * 29}px;">
			<!-- Left: timer -->
			<div class="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
				<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="10"/>
					<path d="M12 6v6l4 2"/>
				</svg>
				<span class="text-sm font-mono font-medium tabular-nums">{formatTime(timer)}</span>
			</div>

			<!-- Center: face button (reset) -->
			<button
				onclick={restart}
				aria-label="Restart game"
				class="flex items-center justify-center rounded-full p-1 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
			>
				{#if status === 'lost'}
					<!-- Dead face with X eyes -->
					<svg class="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<circle cx="12" cy="12" r="10"/>
						<path d="M8 15s1.5-2 4-2 4 2 4 2"/>
						<line x1="7.5" y1="7.5" x2="10.5" y2="10.5" stroke-width="2"/>
						<line x1="10.5" y1="7.5" x2="7.5" y2="10.5" stroke-width="2"/>
						<line x1="13.5" y1="7.5" x2="16.5" y2="10.5" stroke-width="2"/>
						<line x1="16.5" y1="7.5" x2="13.5" y2="10.5" stroke-width="2"/>
					</svg>
				{:else if status === 'won'}
					<!-- Super happy face with sunglasses -->
					<svg class="w-6 h-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<circle cx="12" cy="12" r="10"/>
						<path d="M8 14s1.5 3 4 3 4-3 4-3"/>
						<path d="M6 9h5v2H6z" fill="currentColor"/>
						<path d="M13 9h5v2h-5z" fill="currentColor"/>
						<path d="M11 10h2v1h-2z" fill="currentColor"/>
					</svg>
				{:else if isMouseDown}
					<!-- Surprised face with O mouth -->
					<svg class="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<circle cx="12" cy="12" r="10"/>
						<circle cx="12" cy="15" r="2"/>
						<circle cx="9" cy="9" r="1" fill="currentColor"/>
						<circle cx="15" cy="9" r="1" fill="currentColor"/>
					</svg>
				{:else}
					<!-- Normal happy face -->
					<svg class="w-6 h-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<circle cx="12" cy="12" r="10"/>
						<path d="M8 14s1.5 2 4 2 4-2 4-2"/>
						<circle cx="9" cy="9" r="1" fill="currentColor"/>
						<circle cx="15" cy="9" r="1" fill="currentColor"/>
					</svg>
				{/if}
			</button>

			<!-- Right: bomb count -->
			<div class="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
				<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
					<circle cx="12" cy="12" r="4"/>
					<line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" stroke-width="2.5"/>
					<line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" stroke-width="2.5"/>
					<line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" stroke-width="2.5"/>
					<line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2.5"/>
				</svg>
				<span class="text-sm font-mono font-medium tabular-nums w-5 text-center">{MINES - flagCount}</span>
			</div>
		</div>

		<!-- Board -->
		<div
			class="inline-grid gap-[1px] bg-slate-300 dark:bg-slate-600 p-[1px] rounded-lg"
			role="grid"
			tabindex="0"
			onmousedown={handleBoardMouseDown}
			onmouseup={handleBoardMouseUp}
			onmouseleave={handleBoardMouseLeave}
		>
			{#each board as row, r (r)}
				{#each row as cell, c (c)}
					<Cell
						mine={cell.mine}
						revealed={cell.revealed}
						flagged={cell.flagged}
						count={cell.count}
						disabled={status === 'won' || status === 'lost'}
						onmouseup={(e) => handleCellMouseUp(e, r, c)}
						oncontextmenu={(e) => toggleFlag(e, r, c)}
					/>
				{/each}
			{/each}
		</div>

		<!-- Status message -->
		<div class="h-6 flex items-center justify-center">
			{#if status === 'won'}
				<p class="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide">Cleared!</p>
			{:else if status === 'lost'}
				<p class="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide">Boom.</p>
			{/if}
		</div>
	</div>
</div>

<style>
	.inline-grid {
		grid-template-columns: repeat(8, 1fr);
	}
</style>
