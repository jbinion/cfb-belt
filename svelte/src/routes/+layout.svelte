<script lang="ts">
	import Header from '../components/header/Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex min-h-[110vh] flex-col">
	<Header />

	<main class="mx-auto flex w-full max-w-screen-lg flex-1 flex-col px-8">
		{@render children()}
	</main>

	<footer>
		<p>
			visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to learn about SvelteKit
		</p>
	</footer>
</div>

<style>
	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
