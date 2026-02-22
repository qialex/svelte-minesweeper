<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Timer from '$lib/Timer.svelte';

	const { Story } = defineMeta({
		title: 'Game/StatusBar/Timer',
		component: Timer,
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component: 'Displays elapsed game time in MM:SS format with a clock icon.'
				}
			}
		},
		argTypes: {
			seconds: { control: { type: 'number', min: 0, max: 3600 }, description: 'Elapsed time in seconds' }
		}
	});
</script>

<Story name="Zero" args={{ seconds: 0 }} />

<Story name="Under a minute" args={{ seconds: 45 }} />

<Story name="One minute" args={{ seconds: 60 }} />

<Story name="Over a minute" args={{ seconds: 125 }} />

<Story name="Long game" args={{ seconds: 599 }} />

<Story name="Very long game" args={{ seconds: 3599 }} />
