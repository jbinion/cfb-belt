<script lang="ts">
	import Header from '../components/header/Header.svelte';
	import '../app.css';
	import Footer from '../components/footer/Footer.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-[100vh] flex-col ">
	<Header />
	<main class="mx-auto my-12 flex w-full max-w-screen-sm flex-col space-y-12 px-4 md:px-0">
		{@render children()}
	</main>

	<Footer />
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
