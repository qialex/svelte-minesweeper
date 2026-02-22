<script lang="ts">
	type Props = {
		count: number;
	};

	let { count }: Props = $props();
</script>

<div class="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
	<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
		<circle cx="12" cy="12" r="4"/>
		<line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" stroke-width="2.5"/>
		<line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" stroke-width="2.5"/>
		<line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" stroke-width="2.5"/>
		<line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2.5"/>
	</svg>
	<span class="text-sm font-mono font-medium tabular-nums w-5 text-center">{count}</span>
</div>

