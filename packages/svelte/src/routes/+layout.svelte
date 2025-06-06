<script lang="ts">
	import Header from '../components/header/Header.svelte';
	import '../app.css';
	import Footer from '../components/footer/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';
	import { page } from '$app/stores';
	let { children } = $props();
</script>

<div class="flex min-h-[100vh] flex-col">
	{#if $page.url.pathname === '/'}
		<Header />
	{/if}
	{#if $page.url.pathname !== '/'}
		<Navbar />
	{/if}
	<main class="mx-auto my-12 flex w-full max-w-screen-sm flex-1 flex-col space-y-12 px-4 md:px-0">
		{@render children()}
	</main>

	<Footer />
</div>
