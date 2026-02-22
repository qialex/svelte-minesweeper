<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Minesweeper from '$lib/Minesweeper.svelte';

	const { Story } = defineMeta({
		title: 'Minesweeper/Game',
		component: Minesweeper,
		tags: ['autodocs'],
		parameters: {
			layout: 'fullscreen'
		}
	});
</script>

<Story name="Default" />

