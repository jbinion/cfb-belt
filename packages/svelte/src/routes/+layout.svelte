<script lang="ts">
	import Header from '../components/header/Header.svelte';
	import '../app.css';
	import Footer from '../components/footer/Footer.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-[100vh] flex-col bg-gray-50">
	<Header />

	<main class="mx-auto flex w-full max-w-screen-lg flex-1 flex-col px-8">
		{@render children()}
	</main>

	<footer class="mb-2 mt-24"><Footer /></footer>
</div>

<style>
	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
