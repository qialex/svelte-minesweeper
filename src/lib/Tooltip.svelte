<script lang="ts">
	import { type Snippet } from 'svelte';

	type Props = {
		text: string;
		children: Snippet;
	};

	let { text, children }: Props = $props();
	let visible = $state(false);
</script>

<div
	class="relative inline-flex"
	role="tooltip"
	onmouseenter={() => (visible = true)}
	onmouseleave={() => (visible = false)}
>
	{@render children()}
	{#if visible}
		<div
			class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-slate-900 dark:bg-slate-700 rounded shadow-lg whitespace-nowrap z-50 pointer-events-none"
		>
			{text}
			<div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
		</div>
	{/if}
</div>
