<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tooltip from '$lib/Tooltip.svelte';

	const { Story } = defineMeta({
		title: 'UI/Tooltip',
		component: Tooltip,
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component: 'A tooltip that appears on hover over its child element.'
				}
			}
		},
		argTypes: {
			text: { control: 'text', description: 'The tooltip text to display' }
		}
	});
</script>

<Story name="Default">
	<Tooltip text="This is a tooltip">
		<button class="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
			Hover me
		</button>
	</Tooltip>
</Story>

<Story name="On Icon">
	<Tooltip text="Settings">
		<button class="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
			<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="12" cy="12" r="3"/>
				<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
			</svg>
		</button>
	</Tooltip>
</Story>

<Story name="Long Text">
	<Tooltip text="Click to restart the game with a new random board">
		<button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
			Restart
		</button>
	</Tooltip>
</Story>
