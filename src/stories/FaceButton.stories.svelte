<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FaceButton from '$lib/FaceButton.svelte';

	const { Story } = defineMeta({
		title: 'Game/StatusBar/FaceButton',
		component: FaceButton,
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component: 'The emoji face button that shows game status and restarts the game when clicked.'
				}
			}
		},
		argTypes: {
			status: {
				control: 'select',
				options: ['idle', 'playing', 'won', 'lost'],
				description: 'Current game status'
			},
			isMouseDown: { control: 'boolean', description: 'Whether mouse is pressed on the board' }
		}
	});
</script>

<Story name="Idle" args={{ status: 'idle', isMouseDown: false }} />

<Story name="Playing" args={{ status: 'playing', isMouseDown: false }} />

<Story name="Mouse Down (Surprised)" args={{ status: 'playing', isMouseDown: true }} />

<Story name="Won (Sunglasses)" args={{ status: 'won', isMouseDown: false }} />

<Story name="Lost (Dead)" args={{ status: 'lost', isMouseDown: false }} />
