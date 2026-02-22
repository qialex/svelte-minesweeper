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
		<!-- Header with title -->
		<h1 class="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">Minesweeper</h1>

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

		<!-- Footer -->
		<div class="flex items-center gap-4 mt-6 text-slate-400">
			<!-- svelte-ignore a11y_no_navigation_without_resolve -->
			<a
				href="/storybook"
				target="_blank"
				class="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
				aria-label="Storybook"
			>
				<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
				</svg>
			</a>
			<a
				href="https://github.com/qialex/svelte-minesweeper"
				target="_blank"
				rel="noopener noreferrer"
				class="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
				aria-label="GitHub"
			>
				<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
				</svg>
			</a>
			<a
				href="https://www.linkedin.com/in/aishenko/"
				target="_blank"
				rel="noopener noreferrer"
				class="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
				aria-label="LinkedIn"
			>
				<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
					<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
				</svg>
			</a>
		</div>
	</div>
</div>

<style>
	.inline-grid {
		grid-template-columns: repeat(8, 1fr);
	}
</style>
