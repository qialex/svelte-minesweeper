<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Cell from '$lib/Cell.svelte';

	const { Story } = defineMeta({
		title: 'Minesweeper/Cell',
		component: Cell,
		tags: ['autodocs'],
		argTypes: {
			mine: { control: 'boolean' },
			revealed: { control: 'boolean' },
			flagged: { control: 'boolean' },
			count: { control: { type: 'number', min: 0, max: 8 } }
		}
	});
</script>

<Story name="Hidden" args={{ revealed: false, flagged: false }} />

<Story name="Flagged" args={{ flagged: true, revealed: false }} />

<Story name="Revealed Empty" args={{ revealed: true, count: 0 }} />

<Story name="Revealed With Count" args={{ revealed: true, count: 3 }} />

<Story name="Revealed Mine" args={{ revealed: true, mine: true }} />

