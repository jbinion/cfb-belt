<script lang="ts">
	import '../app.css';
	import Banner from '../components/Banner.svelte';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';
	let { children } = $props();
</script>

<Banner />

<div class="mx-auto flex min-h-[100vh] w-full max-w-screen-sm flex-col px-4 md:px-0">
	<Navbar />

	<main class="my-24 flex-1">
		{@render children()}
	</main>

	<Footer />
</div>
