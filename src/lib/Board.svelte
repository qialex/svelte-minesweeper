<script lang="ts">
	import Cell from './Cell.svelte';

	type CellData = { mine: boolean; revealed: boolean; flagged: boolean; count: number };

	type Props = {
		board: CellData[][];
		rows: number;
		cols: number;
		disabled?: boolean;
		onmousedown?: () => void;
		onmouseup?: () => void;
		onmouseleave?: () => void;
		oncellclick?: (r: number, c: number, e: MouseEvent) => void;
		oncellrightclick?: (r: number, c: number, e: MouseEvent) => void;
	};

	let {
		board,
		rows,
		cols,
		disabled = false,
		onmousedown,
		onmouseup,
		onmouseleave,
		oncellclick,
		oncellrightclick
	}: Props = $props();
</script>

<div
	class="inline-grid gap-[1px] bg-slate-300 dark:bg-slate-600 p-[1px] rounded-lg"
	style="grid-template-columns: repeat({cols}, 1fr);"
	role="grid"
	tabindex="0"
	{onmousedown}
	{onmouseup}
	{onmouseleave}
>
	{#each board as row, r (r)}
		{#each row as cell, c (c)}
			<Cell
				mine={cell.mine}
				revealed={cell.revealed}
				flagged={cell.flagged}
				count={cell.count}
				{disabled}
				onmouseup={(e) => oncellclick?.(r, c, e)}
				oncontextmenu={(e) => oncellrightclick?.(r, c, e)}
			/>
		{/each}
	{/each}
</div>

