<script lang="ts">
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';
	import { page } from '$app/stores';
	let { children } = $props();
</script>

<div class="flex min-h-[100vh] flex-col">
	<Navbar />

	<main class="mx-auto my-24 flex w-full max-w-screen-sm flex-1 flex-col space-y-24 px-4 md:px-0">
		{@render children()}
	</main>

	<Footer />
</div>
