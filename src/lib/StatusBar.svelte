<script lang="ts">
	import Timer from './Timer.svelte';
	import FaceButton from './FaceButton.svelte';
	import MineCounter from './MineCounter.svelte';

	type Props = {
		timer: number;
		minesRemaining: number;
		status: 'idle' | 'playing' | 'won' | 'lost';
		isMouseDown?: boolean;
		onrestart?: () => void;
		width?: number;
	};

	let { timer, minesRemaining, status, isMouseDown = false, onrestart, width = 232 }: Props = $props();
</script>

<div class="flex items-center justify-between w-full" style="max-width: {width}px;">
	<Timer seconds={timer} />
	<FaceButton {status} {isMouseDown} onclick={onrestart} />
	<MineCounter count={minesRemaining} />
</div>

