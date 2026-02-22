<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Welcome',
		parameters: {
			layout: 'fullscreen'
		}
	});
</script>

<Story name="Introduction">
	<div class="p-8 max-w-2xl mx-auto">
		<h1 class="text-3xl font-bold mb-4">💣 Minesweeper</h1>
		<p class="text-lg text-gray-600 mb-6">
			A classic Minesweeper game built with <strong>Svelte 5</strong> and <strong>SvelteKit</strong>.
		</p>

		<h2 class="text-xl font-semibold mt-8 mb-3">About</h2>
		<ul class="list-disc pl-6 space-y-1 text-gray-700">
			<li>🎮 <strong>Classic gameplay</strong> - 8x8 grid with 10 mines</li>
			<li>🛡️ <strong>Safe first click</strong> - Mines placed after first click</li>
			<li>⏱️ <strong>Timer</strong> - Track your solving speed</li>
			<li>🚩 <strong>Flagging</strong> - Right-click to mark mines</li>
			<li>😊 <strong>Expressive face</strong> - Reacts to your actions</li>
		</ul>

		<h2 class="text-xl font-semibold mt-8 mb-3">Components</h2>
		<ul class="list-disc pl-6 space-y-1 text-gray-700">
			<li><strong>Cell</strong> - Individual grid cell with various states</li>
			<li><strong>Game</strong> - The complete Minesweeper game</li>
			<li><strong>Tooltip</strong> - Hover tooltip component</li>
		</ul>

		<h2 class="text-xl font-semibold mt-8 mb-3">Links</h2>
		<ul class="list-disc pl-6 space-y-1">
			<li><a href="https://github.com/qialex/svelte-minesweeper" class="text-blue-600 hover:underline" target="_blank">GitHub Repository</a></li>
			<li><a href="https://www.linkedin.com/in/aishenko/" class="text-blue-600 hover:underline" target="_blank">LinkedIn</a></li>
			<li><a href="https://aishenko.com" class="text-blue-600 hover:underline" target="_blank">Website</a></li>
		</ul>

		<p class="mt-8 text-gray-500 text-sm">
			Made with ❤️ by <a href="https://aishenko.com" class="text-blue-600 hover:underline" target="_blank">Oleksandr Aishenko</a>
		</p>
	</div>
</Story>

