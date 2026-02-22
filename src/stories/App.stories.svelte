<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import App from '$lib/App.svelte';

	const { Story } = defineMeta({
		title: 'App',
		component: App,
		tags: ['autodocs'],
		parameters: {
			layout: 'fullscreen',
			docs: {
				description: {
					component: 'The full application with header, Minesweeper game, and footer.'
				}
			}
		}
	});
</script>

<Story name="Default" />

