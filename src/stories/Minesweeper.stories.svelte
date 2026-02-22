<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Minesweeper from '$lib/Minesweeper.svelte';

	const { Story } = defineMeta({
		title: 'Game/Minesweeper',
		component: Minesweeper,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'The complete Minesweeper game component with status bar, board, and footer.'
				}
			}
		}
	});
</script>

<Story name="Default" />
