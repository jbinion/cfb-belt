<script lang="ts">
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';
	import { page } from '$app/stores';
	import Hero from '../components/hero/Hero.svelte';
	let { children } = $props();
</script>

<div class="flex min-h-[100vh] flex-col">
	<Navbar />
	{#if $page.url.pathname === '/'}
		<Hero />
	{/if}

	<main class="mx-auto my-12 flex w-full max-w-screen-sm flex-1 flex-col space-y-12 px-4 md:px-0">
		{@render children()}
	</main>

	<Footer />
</div>
