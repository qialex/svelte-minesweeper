<script lang="ts">
	type Props = {
		mine?: boolean;
		revealed?: boolean;
		flagged?: boolean;
		count?: number;
		disabled?: boolean;
		onmouseup?: (e: MouseEvent) => void;
		oncontextmenu?: (e: MouseEvent) => void;
	};

	let {
		mine = false,
		revealed = false,
		flagged = false,
		count = 0,
		disabled = false,
		onmouseup,
		oncontextmenu
	}: Props = $props();

	const countColors: Record<number, string> = {
		1: 'text-sky-600',
		2: 'text-emerald-600',
		3: 'text-red-500',
		4: 'text-indigo-600',
		5: 'text-amber-700',
		6: 'text-teal-600',
		7: 'text-slate-700',
		8: 'text-slate-500'
	};
</script>

<button
	class="relative flex items-center justify-center aspect-square w-7 h-7 text-xs font-bold select-none rounded-[3px] transition-all duration-100
		{revealed
			? mine
				? 'bg-red-100 dark:bg-red-900/30'
				: 'bg-transparent'
			: disabled
				? 'bg-slate-200 dark:bg-slate-700'
				: 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer active:scale-95'
		}"
	{onmouseup}
	{oncontextmenu}
	disabled={disabled}
>
	{#if flagged && !revealed}
		<svg class="w-3 h-3 text-orange-500" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
			<path d="M4 21V4h10l.5 2H19v9h-7l-.5-2H6v8H4z"/>
		</svg>
	{:else if revealed && mine}
		<svg class="w-3.5 h-3.5 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="currentColor">
			<circle cx="12" cy="12" r="4"/>
			<line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" stroke-width="2.5"/>
			<line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" stroke-width="2.5"/>
			<line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" stroke-width="2.5"/>
			<line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2.5"/>
			<line x1="5.64" y1="5.64" x2="7.76" y2="7.76" stroke="currentColor" stroke-width="2"/>
			<line x1="16.24" y1="16.24" x2="18.36" y2="18.36" stroke="currentColor" stroke-width="2"/>
			<line x1="5.64" y1="18.36" x2="7.76" y2="16.24" stroke="currentColor" stroke-width="2"/>
			<line x1="16.24" y1="7.76" x2="18.36" y2="5.64" stroke="currentColor" stroke-width="2"/>
		</svg>
	{:else if revealed && count > 0}
		<span class="{countColors[count]} leading-none">{count}</span>
	{/if}
</button>
