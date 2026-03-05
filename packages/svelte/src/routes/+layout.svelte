<script lang="ts">
	import '../app.css';
	import Banner from '../components/Banner.svelte';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';
	let { children } = $props();
</script>

<!-- <Banner /> -->

<div class="mx-auto flex min-h-[100vh] flex-col">
	<Navbar />

	<main class="flex-1">
		{@render children()}
	</main>

	<Footer />
</div>
