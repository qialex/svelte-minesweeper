<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tooltip from '$lib/Tooltip.svelte';

	const { Story } = defineMeta({
		title: 'Minesweeper/Tooltip',
		component: Tooltip,
		tags: ['autodocs'],
		argTypes: {
			text: { control: 'text' }
		}
	});
</script>

<Story name="Default" args={{ text: 'Restart' }}>
	{#snippet children()}
		<Tooltip text="Restart">
			<button class="px-3 py-1 bg-slate-200 rounded">Hover me</button>
		</Tooltip>
	{/snippet}
</Story>
