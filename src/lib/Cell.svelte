<script lang="ts">
	type Props = {
		mine?: boolean;
		revealed?: boolean;
		flagged?: boolean;
		count?: number;
		onclick?: () => void;
		oncontextmenu?: (e: MouseEvent) => void;
	};

	let {
		mine = false,
		revealed = false,
		flagged = false,
		count = 0,
		onclick,
		oncontextmenu
	}: Props = $props();
</script>

<button
	class="cell"
	class:revealed
	class:mine={revealed && mine}
	{onclick}
	{oncontextmenu}
>
	{#if flagged && !revealed}
		🚩
	{:else if revealed && mine}
		💣
	{:else if revealed && count > 0}
		{count}
	{/if}
</button>

<style>
	.cell {
		width: 30px;
		height: 30px;
		border: 1px solid #999;
		background: #ccc;
		cursor: pointer;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}
	.cell.revealed {
		background: #eee;
	}
	.cell.mine {
		background: #f00;
	}
</style>

