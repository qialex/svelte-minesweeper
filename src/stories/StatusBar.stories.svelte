<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import StatusBar from '$lib/StatusBar.svelte';

	const { Story } = defineMeta({
		title: 'Game/StatusBar',
		component: StatusBar,
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component: 'Combines Timer, FaceButton, and MineCounter into a status bar above the game board.'
				}
			}
		},
		argTypes: {
			timer: { control: { type: 'number', min: 0 }, description: 'Elapsed time in seconds' },
			minesRemaining: { control: { type: 'number', min: -10, max: 99 }, description: 'Remaining unflagged mines' },
			status: {
				control: 'select',
				options: ['idle', 'playing', 'won', 'lost'],
				description: 'Current game status'
			},
			isMouseDown: { control: 'boolean', description: 'Whether mouse is pressed on the board' },
			width: { control: { type: 'number', min: 100, max: 500 }, description: 'Maximum width in pixels' }
		}
	});
</script>

<Story name="Idle" args={{ timer: 0, minesRemaining: 10, status: 'idle', isMouseDown: false, width: 232 }} />

<Story name="Playing" args={{ timer: 45, minesRemaining: 7, status: 'playing', isMouseDown: false, width: 232 }} />

<Story name="Mouse Down" args={{ timer: 30, minesRemaining: 8, status: 'playing', isMouseDown: true, width: 232 }} />

<Story name="Won" args={{ timer: 120, minesRemaining: 0, status: 'won', isMouseDown: false, width: 232 }} />

<Story name="Lost" args={{ timer: 55, minesRemaining: 3, status: 'lost', isMouseDown: false, width: 232 }} />

<Story name="Wide Layout" args={{ timer: 90, minesRemaining: 5, status: 'playing', isMouseDown: false, width: 400 }} />
