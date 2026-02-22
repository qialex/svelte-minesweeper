<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MineCounter from '$lib/MineCounter.svelte';

	const { Story } = defineMeta({
		title: 'Game/StatusBar/MineCounter',
		component: MineCounter,
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component: 'Displays remaining unflagged mines with a bomb icon.'
				}
			}
		},
		argTypes: {
			count: { control: { type: 'number', min: -10, max: 99 }, description: 'Remaining mines (total - flagged)' }
		}
	});
</script>

<Story name="Full (10 mines)" args={{ count: 10 }} />

<Story name="Some flagged" args={{ count: 5 }} />

<Story name="All flagged" args={{ count: 0 }} />

<Story name="Over-flagged" args={{ count: -2 }} />

<Story name="Large count" args={{ count: 99 }} />
