<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let isMenuOpen = false;
	let isScrolled = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 10;
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<header
	class="sticky top-0 z-50 w-full transition-all duration-300"
	class:shadow-md={isScrolled}
	class:bg-white={isScrolled}
	class:bg-transparent={!isScrolled}
>
	<div class="mx-auto flex w-full max-w-screen-lg flex-col px-4 md:px-8">
		<div class="flex items-center justify-between py-4">
			<a href="/" class="flex items-center space-x-2 text-blue-900 hover:text-blue-700">
				<div class="flex h-10 w-10 items-center justify-center">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-10 w-10">
						<path
							d="M12 2L9 4L6 3L4 6L3 9L2 12L3 15L4 18L6 21L9 20L12 22L15 20L18 21L20 18L21 15L22 12L21 9L20 6L18 3L15 4L12 2Z"
							fill="#D4AF37"
							stroke="#8B7300"
						/>
						<circle cx="12" cy="12" r="4" fill="#D4AF37" stroke="#8B7300" />
						<path d="M12 8V16" stroke="#8B7300" />
						<path d="M8 12H16" stroke="#8B7300" />
					</svg>
				</div>
				<h1 class="text-xl font-bold">CFB-Belt.com</h1>
			</a>

			<!-- Mobile menu button -->
			<button
				class="rounded p-2 text-blue-900 hover:bg-blue-100 md:hidden"
				on:click={toggleMenu}
				aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					{#if isMenuOpen}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					{:else}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					{/if}
				</svg>
			</button>

			<!-- Desktop navigation -->
			<nav class="hidden space-x-6 md:flex">
				<a
					href="/history"
					class="font-mono text-blue-900 transition-colors hover:text-blue-700"
					class:font-bold={$page.url.pathname === '/history'}
				>
					Complete Lineage
				</a>
				<a
					href="/teams"
					class="font-mono text-blue-900 transition-colors hover:text-blue-700"
					class:font-bold={$page.url.pathname === '/teams'}
				>
					Teams
				</a>
			</nav>
		</div>

		<!-- Mobile navigation -->
		{#if isMenuOpen}
			<nav class="flex flex-col space-y-4 border-t border-gray-200 py-4 md:hidden">
				<a
					href="/history"
					class="font-mono text-blue-900 transition-colors hover:text-blue-700"
					class:font-bold={$page.url.pathname === '/history'}
					on:click={() => (isMenuOpen = false)}
				>
					Complete Lineage
				</a>
				<a
					href="/teams"
					class="font-mono text-blue-900 transition-colors hover:text-blue-700"
					class:font-bold={$page.url.pathname === '/teams'}
					on:click={() => (isMenuOpen = false)}
				>
					Teams
				</a>
			</nav>
		{/if}
	</div>
</header>
