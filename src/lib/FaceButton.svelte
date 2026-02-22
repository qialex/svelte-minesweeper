<script lang="ts">
	type Props = {
		status: 'idle' | 'playing' | 'won' | 'lost';
		isMouseDown?: boolean;
		onclick?: () => void;
	};

	let { status, isMouseDown = false, onclick }: Props = $props();
</script>

<button
	{onclick}
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

