<script lang="ts">
	import AboutText from '../components/AboutText.svelte';
	import CurrentHolderCard from '../components/CurrentHolderCard.svelte';
	import NextGame from '../components/NextGame.svelte';
	import TeamCard from '../components/TeamCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>College Football Belt Tracker</title>
	<meta
		name="description"
		content="Track the history and current holder of the College Football Belt - a fan-created championship title that traces its lineage through decades of college football."
	/>
</svelte:head>

<div class="hero-section bg-gradient-to-br from-blue-900 to-blue-700 py-12 text-white">
	<div class="container mx-auto px-4 text-center">
		<h1 class="mb-4 text-4xl font-bold md:text-5xl">College Football Belt</h1>
		<p class="mx-auto max-w-2xl text-lg text-blue-100">
			Tracking the unofficial championship title that traces its lineage through decades of college
			football
		</p>
	</div>
</div>

<main class="container mx-auto px-4 py-8">
	<!-- Current Holder & Next Game Section -->
	<div class="mb-12 grid gap-6 md:grid-cols-2">
		<section
			class="transform rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
		>
			<h2 class="mb-4 border-b border-gray-200 pb-2 font-mono text-xl font-bold text-blue-800">
				Current Belt Holder
			</h2>
			<div class="current-holder-wrapper">
				<CurrentHolderCard />
			</div>
		</section>

		<section
			class="transform rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
		>
			<h2 class="mb-4 border-b border-gray-200 pb-2 font-mono text-xl font-bold text-blue-800">
				Next Championship Game
			</h2>
			<div class="next-game-wrapper">
				<NextGame />
			</div>
		</section>
	</div>

	<!-- Recent Lineage Section -->
	<section
		class="mb-12 transform rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
	>
		<h2 class="mb-4 border-b border-gray-200 pb-2 font-mono text-xl font-bold text-blue-800">
			Recent Belt Lineage
		</h2>
		{#if data && data.reigns && data.reigns.length > 0}
			<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{#each data.reigns as item (item._id)}
					<div class="transform transition-all duration-300 hover:scale-105">
						<TeamCard logo={item.team.logoFile} name={item.team.name} slug={item.team.slug} />
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-gray-500">Loading recent belt holders...</p>
		{/if}
	</section>

	<!-- About Section -->
	<section
		class="transform rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
	>
		<h2 class="mb-4 border-b border-gray-200 pb-2 font-mono text-xl font-bold text-blue-800">
			About The College Football Belt
		</h2>
		<div class="about-content prose max-w-none">
			<AboutText />
		</div>
	</section>
</main>

<style>
	:global(.card) {
		@apply rounded-lg border-0 shadow-none;
	}

	:global(.sectionTitle) {
		@apply hidden;
	}

	.hero-section {
		background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
	}

	.about-content :global(p) {
		@apply mb-4 text-gray-700;
	}

	.about-content :global(ul) {
		@apply mb-4 ml-6 list-disc text-gray-700;
	}

	.about-content :global(a) {
		@apply text-blue-600 hover:text-blue-800 hover:underline;
	}
</style>
