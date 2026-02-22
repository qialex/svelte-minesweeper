<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Cell from '$lib/Cell.svelte';

	const { Story } = defineMeta({
		title: 'Game/Board/Cell',
		component: Cell,
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component: 'A single cell in the Minesweeper grid. Can be hidden, flagged, or revealed with a count or mine.'
				}
			}
		},
		argTypes: {
			mine: { control: 'boolean', description: 'Whether the cell contains a mine' },
			revealed: { control: 'boolean', description: 'Whether the cell has been revealed' },
			flagged: { control: 'boolean', description: 'Whether the cell has been flagged' },
			count: { control: { type: 'number', min: 0, max: 8 }, description: 'Number of adjacent mines' },
			disabled: { control: 'boolean', description: 'Whether clicks are disabled' }
		}
	});
</script>

<Story name="Hidden" args={{ revealed: false, flagged: false, mine: false, count: 0, disabled: false }} />

<Story name="Flagged" args={{ flagged: true, revealed: false, mine: true, count: 0, disabled: false }} />

<Story name="Revealed Empty" args={{ revealed: true, count: 0, mine: false, flagged: false, disabled: false }} />

<Story name="Count 1" args={{ revealed: true, count: 1, mine: false, flagged: false, disabled: false }} />

<Story name="Count 2" args={{ revealed: true, count: 2, mine: false, flagged: false, disabled: false }} />

<Story name="Count 3" args={{ revealed: true, count: 3, mine: false, flagged: false, disabled: false }} />

<Story name="Count 4" args={{ revealed: true, count: 4, mine: false, flagged: false, disabled: false }} />

<Story name="Revealed Mine" args={{ revealed: true, mine: true, count: 0, flagged: false, disabled: false }} />

<Story name="Disabled" args={{ revealed: false, disabled: true, mine: false, flagged: false, count: 0 }} />
