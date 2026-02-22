<script lang="ts">
	type Props = {
		seconds: number;
	};

	let { seconds }: Props = $props();

	function formatTime(secs: number): string {
		const mins = Math.floor(secs / 60);
		const s = secs % 60;
		return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
	}
</script>

<div class="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
	<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
		<circle cx="12" cy="12" r="10"/>
		<path d="M12 6v6l4 2"/>
	</svg>
	<span class="text-sm font-mono font-medium tabular-nums">{formatTime(seconds)}</span>
</div>

