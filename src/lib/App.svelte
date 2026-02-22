<script lang="ts">
	import Minesweeper from './Minesweeper.svelte';
	import Footer from './Footer.svelte';
</script>

<div class="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-8">
	<div class="flex flex-col items-center gap-4">
		<h1 class="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">Minesweeper</h1>

		<Minesweeper />

		<Footer />
	</div>
</div>

